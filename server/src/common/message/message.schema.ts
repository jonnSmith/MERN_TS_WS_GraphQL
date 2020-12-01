// tslint:disable-next-line:no-submodule-imports
import {ForbiddenError} from '@apollo/server/errors';
import {CoreBus} from "../../core/bus";

import User from '../user/user.model';
import Workspace from '../workspace/workspace.model';
import Message from './message.model';

export const messageTypeDefs = `

  type Message {
    id: ID!
    userId: String!
    user: User
    text: String!
    workspaceId: String
    workspace: Workspace
    createdAt: String!
  }

  extend type Query {
    messages: [Message]
    message(id: ID!): Message!
    preloadMessage: Message
  }

  extend type Mutation {
    createMessage(text: String!): Message
    deleteMessage(id: ID!): Message
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

const ActionKeys = {
  UPDATE: 'MESSAGE_UPDATED',
  CREATE: 'MESSAGE_ADDED',
  DELETE: 'MESSAGE_DELETED'
}

const UPDATE_ACTION_TRIGGER = 'CHAT_UPDATED';

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
    preloadMessage: async (_, {}, context) => {
      const message: any= await Message.findOne({}).sort({createdAt: -1});
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
        await PubSub.publish(UPDATE_ACTION_TRIGGER, {chatUpdated: { ...{message, ...{user}}, action: ActionKeys.CREATE}});
        return message.toObject();
      }
      catch(e) {
        console.debug(e);
        throw new ForbiddenError('Message forbidden to create.');
      }
    },
    deleteMessage: async (_, { id }, context) => {
      try {
        const message: any = await Message.findByIdAndRemove(id);
        const updated: any= await Message.findOne({}).sort({createdAt: -1});
        await PubSub.publish(UPDATE_ACTION_TRIGGER, {chatUpdated: { message: updated, action: ActionKeys.DELETE}});
        return message.toObject();
      } catch(e) {
        throw new ForbiddenError('Message forbidden to delete.');
      }
    },
  },
  Subscription: {
    chatUpdated: {
      subscribe: () => PubSub.asyncIterator([UPDATE_ACTION_TRIGGER]),
    }
  },
  Message: {
    async user(message: { userId: string }) {
      if (message.userId) {
        const user: any = await User.findById(message.userId);
        return user.toObject();
      }
      return null;
    },
    async workspace(message: { workspaceId: string }) {
      if (message.workspaceId) {
        const workspace: any = await Workspace.findById(message.workspaceId);
        return workspace.toObject();
      }
      return null;
    },
  },
};