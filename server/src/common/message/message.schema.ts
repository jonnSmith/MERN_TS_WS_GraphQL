import { ForbiddenError } from 'apollo-server';

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
  }

  extend type Mutation {
    createMessage(text: String!): Message
    deleteMessage(id: ID!): Message
  }

`;

export const messageResolvers = {
  Query: {
    messages: async (_, {}, {}) => {
      let messages: any[] = await Message.find({}, null, {});
      messages = messages.map(m => m.toObject());
      return { messages };
    },
    message: async (_, { id }) => {
      const message: any = await Message.findById(id);
      return message.toObject();
    },
  },
  Mutation: {
    createMessage: async (_, { text }, { id }) => {
        const message: any = await Message.create({
          text,
          userId: id,
        });
        if(!message) {
          throw new ForbiddenError('Message forbidden to create.');
        }
        return message.toObject();
      },
    deleteMessage: async (_, { id }, { }) => {
        const message: any = await Message.findByIdAndRemove(id);
        if(!message) {
          throw new ForbiddenError('Message forbidden to delete.');
        }
        return message.toObject();
      },
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