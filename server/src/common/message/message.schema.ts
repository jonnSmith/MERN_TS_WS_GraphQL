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
    messages(filter: MessageFilterInput): [Message]
    message(id: String!): Message
  }

  extend type Mutation {
    createMessage(text: String!): Message
    deleteMessage(id: String!): Message
  }

`;

export const messageResolvers = {
  Query: {
    async messages(_, { filter = {} }) {
      const messages: any[] = await Message.find({}, null, filter);
      return messages.map(message => message.toObject());
    },
    async message(_, { id }) {
      const message: any = await Message.findById(id);
      return message.toObject();
    },
  },
  Mutation: {
    async createMessage(_, { text }, { user }) {
      if (!user || !user.id) { throw new Error('Not Authorised.'); }
      const message: any = await Message.create({
        text: text,
        userId: user.id
      });
      return message.toObject();
    },
    async deleteMessage(_, { id }) {
      const message: any = await Message.findByIdAndRemove(id);
      return message ? message.toObject() : null;
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
