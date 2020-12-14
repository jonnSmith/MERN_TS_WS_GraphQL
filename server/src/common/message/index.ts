// tslint:disable-next-line:no-submodule-imports
import {ForbiddenError} from "@apollo/server/errors";
import {CoreBus} from "@backchat/core/bus";

import {User} from "@shared/data/user";
import {Workspace} from "@shared/data/workspace";
import {Message} from "@shared/data/message";
import {ACTIONS, UPDATE_CHAT_TRIGGER} from "@backchat/core/bus/actions";
import {ID} from "graphql-ws";
import {TOP_MESSAGE} from "../../core/adapters";

export const messageTypeDefs = `

  type Message {
    id: ID
    userId: ID
    user: User
    text: String
    workspaceId: ID
    workspace: Workspace
    createdAt: String
  }

  extend type Query {
    messages: [Message]
    message(id: ID): Message!
  }

  extend type Mutation {
    createMessage(text: String!): Message
    deleteMessage(id: ID): Message
  }
  
  type updateAction {
    message: Message
    action: String
  }
  
  extend type Subscription {
    chatUpdated: updateAction
  }
`;

const PubSub = CoreBus.pubsub;

export const messageResolvers = {
  Query: {
    messages: async (_, {}, context) => {
      let messages: any[] = await Message.find({}, null, {});
      messages = messages.map(m => m.toObject());
      return { messages };
    },
    message: async (_, { id }, context) => {
      const message: any = await Message.findById(id);
      return message.toObject();
    },
  },
  Mutation: {
    createMessage: async (_, { text }, context) => {
      try {
        const { user } = await context;
        const message: any = await Message.create({
          text,
          userId: user?.id,
        });
        await PubSub.publish(UPDATE_CHAT_TRIGGER, {chatUpdated: { ...{message, ...{user}}, action: ACTIONS.MESSAGE.CREATE}});
        return message.toObject();
      }
      catch(e) {
        console.debug(e);
        throw new ForbiddenError("Message forbidden to create.");
      }
    },
    deleteMessage: async (_, { id }, context) => {
      try {
        const message: any = await Message.findByIdAndRemove(id);
        const updated: any= await TOP_MESSAGE;
        await PubSub.publish(UPDATE_CHAT_TRIGGER, {chatUpdated: { message: updated, action: ACTIONS.MESSAGE.DELETE}});
        return message.toObject();
      } catch(e) {
        throw new ForbiddenError("Message forbidden to delete.");
      }
    },
  },
  Subscription: {
    chatUpdated: {
      subscribe: () => PubSub.asyncIterator([UPDATE_CHAT_TRIGGER]),
    }
  },
  Message: {
    async user(message: { userId: ID }) {
      if (message.userId) {
        const user: any = await User.findById(message.userId);
        return user.toObject();
      }
      return {};
    },
    async workspace(message: { workspaceId: ID }) {
      if (message.workspaceId) {
        const workspace: any = await Workspace.findById(message.workspaceId);
        return workspace.toObject();
      }
      return {};
    },
  },
};