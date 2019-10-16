import { combineResolvers } from 'graphql-resolvers';
import { ForbiddenError } from 'apollo-server';

import pubsub, { EVENTS } from '../../helpers/subscription';
import { isAuthenticated, isMessageOwner } from '../../helpers/authorization';

import User from '../user/user.model';
import Workspace from '../workspace/workspace.model';
import Message from './message.model';

const DEFAULT_FILTER = { skip: 0, limit: 100, order: 'asc'};

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
    order: String
  }

  extend type Query {
    stream(filter: MessageFilterInput): MessageConnection!
    count: MessagesCount
    message(id: ID!): Message!
  }

  extend type Mutation {
    createMessage(text: String!, filter: MessageFilterInput): Message
    deleteMessage(id: ID!, filter: MessageFilterInput): Message
  }
  
  type MessageConnection {
    messages: [Message]
  }
  
  type MessagesCount {
    total: Int
  }
  
  extend type Subscription {
    messageUpdated: MessageUpdated
    messageCreated: MessageCreated
    messageDeleted: MessageDeleted
  }
  
  type MessageUpdated {
    messages: [Message]
  }
  
  type MessageCreated {
    message: Message
  }
  
  type MessageDeleted {
    message: Message
  }

`;

export const messageResolvers = {
  Query: {
    stream: async (parent, { filter = DEFAULT_FILTER }, { _ }) => {
      let messages: any[] = await Message.find({}, null, {
        skip: filter.skip,
        limit: filter.limit,
        sort:{
          createdAt: filter.order
        }
      });
      messages = messages.map(m => m.toObject());
      return { messages };
    },
    message: combineResolvers(
      isAuthenticated,
      async (_, { id }) => {
        const message: any = await Message.findById(id);
        return message.toObject();
      },
    ),
    count: combineResolvers(
      isAuthenticated,
      async (_, {  }) => {
        const total: number = await Message.countDocuments({});
        return { total };
      },
    ),
  },

  Mutation: {
    createMessage: combineResolvers(
        isAuthenticated,
      async (parent, { text, filter = DEFAULT_FILTER }, { user }) => {
        let message: any = await Message.create({
          text: text,
          userId: user.id,
          workspaceId: user.workspaceId
        });
        if(!message) {
          throw new ForbiddenError('Message forbidden to create.');
        }
        pubsub.publish(EVENTS.MESSAGE.CREATED, { messageCreated: { message }, });
        const messages: any[] = await Message.find({}, null, {
          skip: filter.skip,
          limit: filter.limit,
          sort:{
            createdAt: filter.order
          }
        });
        if(!messages) {
          throw new ForbiddenError('Message forbidden to query.');
        }
        pubsub.publish(EVENTS.MESSAGE.UPDATED, {
          messageUpdated: { messages },
        });
        return message.toObject();
      },
    ),
    deleteMessage: combineResolvers(
      isAuthenticated,
      isMessageOwner,
      async (parent, { id, filter = DEFAULT_FILTER }, { _ }) => {
        const message: any = await Message.findByIdAndRemove(id);
        if(!message) {
          throw new ForbiddenError('Message forbidden to delete.');
        }
        pubsub.publish(EVENTS.MESSAGE.DELETED, { messageDeleted: { message }, });
        const messages: any[] = await Message.find({}, null, {
          skip: filter.skip,
          limit: filter.limit,
          sort:{
            createdAt: filter.order
          }
        });
        if(!messages) {
          throw new ForbiddenError('Message forbidden to query.');
        }
        pubsub.publish(EVENTS.MESSAGE.UPDATED, {
          messageUpdated: { messages },
        });
        return message.toObject();
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
    messageDeleted: {
      subscribe: () => pubsub.asyncIterator(EVENTS.MESSAGE.DELETED),
    },
    messageUpdated: {
      subscribe: () => pubsub.asyncIterator(EVENTS.MESSAGE.UPDATED),
    },
  },
};