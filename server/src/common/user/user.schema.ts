import * as jwt from 'jsonwebtoken';
import Workspace from '../workspace/workspace.model';
import User from './user.model';
import config from '../../../../configs/config.app';

export const userTypeDefs = `

  type User {
    id: ID!
    workspaceId: String
    workspace: Workspace
    email: String!
    password: String!
    firstName: String!
    lastName: String
  }

  input UserFilterInput {
    limit: Int
  }

  extend type Query {
    users(filter: UserFilterInput): [User]
    user(id: String!): User
  }

  input UserInput {
    email: String
    password: String
    firstName: String
    lastName: String
    workspaceId: String
  }

  extend type Mutation {
    addUser(input: UserInput!): User
    editUser(id: String!, input: UserInput!): User
    deleteUser(id: String!): User
    loginUser(email: String!, password: String!): String!
  }

`;

export const userResolvers = {
  Query: {
    async users(_, { filter = {} }) {
      const users: any[] = await User.find({}, null, filter);
      return users.map(user => user.toObject());
    },
    async user(_, { id }) {
      const user: any = await User.findById(id);
      return user.toObject();
    },
  },
  Mutation: {
    async addUser(_, { input }) {
      const user: any = await User.create(input);
      return user.toObject();
    },
    async editUser(_, { id, input }) {
      const user: any = await User.findByIdAndUpdate(id, input);
      return user.toObject();
    },
    async deleteUser(_, { id }) {
      const user: any = await User.findByIdAndRemove(id);
      return user ? user.toObject() : null;
    },
    async loginUser(_, { email, password }) {
      const user: any = await User.findOne({ email });
      const match: boolean = await user.comparePassword(password);
      if (match) {
        return jwt.sign({ id: user.id }, config.token.secret);
      }
      throw new Error('Not Authorised.');
    },
  },
  User: {
    async workspace(user: { workspaceId: string }) {
      if (user.workspaceId) {
        const workspace: any = await Workspace.findById(user.workspaceId);
        return workspace.toObject();
      }
      return null;
    },
  },
};
