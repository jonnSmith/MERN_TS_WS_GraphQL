// tslint:disable-next-line:no-submodule-imports
import { ForbiddenError } from '@apollo/server/errors';
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
        await PubSub.publish('CHAT_UPDATED', {chatUpdated: { ...{message, ...{user}}, action: 'create'}});
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
        await PubSub.publish('CHAT_UPDATED', {chatUpdated: { message, action: 'delete'}});
        return message.toObject();
      } catch(e) {
        throw new ForbiddenError('Message forbidden to delete.');
      }
    },
  },
  Subscription: {
    chatUpdated: {
      subscribe: () => PubSub.asyncIterator(['CHAT_UPDATED']),
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