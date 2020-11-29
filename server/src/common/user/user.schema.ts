import * as jwt from 'jsonwebtoken';
import Workspace from '../workspace/workspace.model';
import {AuthenticationError, UserInputError} from "apollo-server";
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
    token: String
  }

  input UserFilterInput {
    limit: Int
  }

  extend type Query {
    users(filter: UserFilterInput): [User]
    user(id: String!): User
    currentUser: User
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
    signInUser(email: String!, password: String!): User
    signUpUser(email: String!, password: String!, firstName: String!, lastName: String): User
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
    async currentUser(_, {}, user) {
      const { id } = user;
      if (!id) { return null; }
      try {
        const userDocument = await User.findById(id);
        if (!userDocument) { return null; }
        const userObject = userDocument.toObject();
        userObject.token = jwt.sign({id: userObject.id}, config.token.secret);
        return userObject;
      }
      catch (e) {
        throw new AuthenticationError(e);
      }
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
    async signUpUser(_, data) {
      const { email, password, firstName, lastName} = data;
      let userObject;
      try {
        const user: any = await User.create({email, password, firstName, lastName});
        userObject = user.toObject();
        userObject.token = jwt.sign({id: user.id}, config.token.secret);
      } catch (e) {
        throw new UserInputError(e);
      }
      return userObject;
    },
    async signInUser(_, data) {
      const { email, password} = data;
      let userObject;
      try {
        const user: any = await User.findOne({email});
        const match: boolean = await user.comparePassword(password);
        userObject = match ? user.toObject() : null;
        userObject.token = jwt.sign({id: user.id}, config.token.secret);
      } catch (e) {
        throw new UserInputError(e);
      }
      return userObject;
    }
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
