import Sequelize from 'sequelize';
import { combineResolvers } from 'graphql-resolvers';

import pubsub, { EVENTS } from '../../helpers/subscription';
import { isAuthenticated, isMessageOwner } from '../../helpers/authorization';

const toCursorHash = string => Buffer.from(string).toString('base64');

const fromCursorHash = string =>
  Buffer.from(string, 'base64').toString('ascii');

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

  input MessageFilterInput {
    skip: Int
    limit: Int
  }
  
  type Subscription {
    messageAdded(repoFullName: String!): Message
  }

  extend type Query {
    messages(skip: Int, limit: Int): MessageConnection!
    message(id: ID!): Message!
  }

  extend type Mutation {
    createMessage(text: String!): Message!
    deleteMessage(id: ID!): Boolean!
  }
  
  type MessageConnection {
    edges: [Message!]!
    pageInfo: PageInfo!
  }
  
  type PageInfo {
    hasNextPage: Boolean!
    endCursor: String!
  }
  
   extend type Subscription {
    messageCreated: MessageCreated!
  }
  
  type MessageCreated {
    message: Message!
  }

`;

export const messageResolvers = {
  Query: {
    messages: async (parent, { skip, limit = 100 }, { _ }) => {
      const messages: any[] = await Message.find({}, null, {
        order: [['createdAt', 'DESC']],
        limit: limit,
        skip
      });
      const hasNextPage = messages.length > limit;
      const edges = hasNextPage ? messages.slice(0, -1) : messages;

      return {
        edges,
        pageInfo: {
          hasNextPage,
          endCursor: messages.length,
        },
      };
    },
    async message(_, { id }) {
      const message: any = await Message.findById(id);
      return message.toObject();
    },
  },

  Mutation: {
    createMessage: combineResolvers(
      isAuthenticated,
      async (parent, { text }, { me }) => {
        const message: any = await Message.create({
          text: text,
          userId: me.id
        });
        pubsub.publish(EVENTS.MESSAGE.CREATED, {
          messageCreated: { message },
        });
        return message.toObject();
      },
    ),
    deleteMessage: combineResolvers(
      isAuthenticated,
      isMessageOwner,
      async (parent, { id }, { _ }) => {
        const message: any = await Message.findByIdAndRemove(id);
        return message ? message.toObject() : null;
      },
    ),
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
  Subscription: {
    messageCreated: {
      subscribe: () => pubsub.asyncIterator(EVENTS.MESSAGE.CREATED),
    },
  },
};