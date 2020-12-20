import {ForbiddenError} from "@apollo/server/errors";
import {CoreBus} from "@backchat/core/bus";
import {User} from "@shared/data/user";
import {Message} from "@shared/data/message";
import {UPDATE_CHAT_TRIGGER} from "@backchat/core/bus/actions";
import {ID} from "graphql-ws";
import {publishMessage, publishTopMessage, queryUser} from "../../core/adapters";

export const messageTypeDefs = `

  type Message {
    id: ID
    userId: ID
    user: User
    text: String
    workspaceId: ID
    createdAt: String
  }

  extend type Query {
    message(id: ID): Message
  }

  extend type Mutation {
    createMessage(text: String!, workspaceId: ID): Message
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

const pubsub = CoreBus.pubsub;

export const messageResolvers = {
  Query: {
    message: async (_, { id }, context) => {
      const document = Message.findById(id);
      return publishMessage(document, null);
    },
  },
  Mutation: {
    createMessage: async (_, { text, workspaceId }, context) => {
      try {
        const { id } = await context;
        const document: any = Message.create({
          text,
          userId: id,
          workspaceId,
        });
        return publishMessage(document, pubsub);
      }
      catch(e) {
        console.debug(e);
        throw new ForbiddenError("Message forbidden to create.");
      }
    },
    deleteMessage: async (_, { id }, context) => {
      try {
        const { id: userId } = await context;
        await Message.findOneAndRemove({id,userId});
        return publishTopMessage(pubsub);
      } catch(e) {
        throw new ForbiddenError("Message forbidden to delete.");
      }
    },
  },
  Subscription: {
    chatUpdated: {
      subscribe: () => pubsub.asyncIterator([UPDATE_CHAT_TRIGGER]),
    }
  },
  Message: {
    async user(message: { userId: ID }) {
      if (message.userId) {
        const document: any = await User.findById(message.userId);
        return queryUser(document);
      }
      return {};
    },
  },
};