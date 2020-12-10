import * as jwt from 'jsonwebtoken';
import Workspace from '../workspace/workspace.model';
import {UserInputError} from '@apollo/server/errors';
import User from './user.model';
import config from '../../../../configs/config.app';
import {CoreBus} from "../../core/bus";
import {ACTIONS, ONLINE_USERS_TRIGGER, UPDATE_CHAT_TRIGGER} from "../../core/bus/actions";
import Message from "../message/message.model";
import {UsersMap} from "../../core/bus/users";
import {IOnlineUserData} from "../../core/bus/interfaces";

// TODO: Remove password field from User data type

export const userTypeDefs = `

  type User {
    id: ID!
    workspaceId: String
    workspace: Workspace
    email: String
    password: String
    firstName: String
    lastName: String
    token: String
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
  
  input UserUpdate {
    id: ID!
    firstName: String
    lastName: String
  }

  extend type Mutation {
    addUser(input: UserInput!): User
    updateUser(firstName: String, lastName: String, id: ID!): User
    deleteUser(id: String!): User
    signInUser(email: String!, password: String!): User
    signUpUser(email: String!, password: String!, firstName: String!, lastName: String): User
    signOutUser(email: String!): OnlineUsersData
  }
  
  extend type Subscription {
    onlineUsers: OnlineUsersData
  }
  
  type OnlineUsersData {
    list: [OnlineUser]
    action: String
  }
  
  type OnlineUser {
    email: String
    typing: Boolean
  }

`;

const PubSub = CoreBus.pubsub;

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
    async updateUser(_, { id, firstName, lastName }, context) {
      const {user} = await context;
      if(id !== user.id) { return user; }
      const updated: any = await User.findByIdAndUpdate(user.id, {firstName, lastName}, {new: true});
      const data = updated.toObject();
      data.token = jwt.sign({id: user.id}, config.token.secret);
      return data;
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

        const onlineUser: IOnlineUserData = {
          email: userObject.email,
          typing: false
        }
        UsersMap.set(onlineUser);
        await PubSub.publish(ONLINE_USERS_TRIGGER, {onlineUsers: { list: UsersMap.online , action: ACTIONS.USER.CONNECT}});

        const message: any = await Message.findOne({}).sort({createdAt: -1});
        const author = await User.findById(message.userId);
        await PubSub.publish(UPDATE_CHAT_TRIGGER, {chatUpdated: { ...{message, ...{user: author}}, action: ACTIONS.MESSAGE.UPDATE}});
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

        const onlineUser: IOnlineUserData = {
          email: userObject.email,
          typing: false
        }
        UsersMap.set(onlineUser);
        await PubSub.publish(ONLINE_USERS_TRIGGER, {onlineUsers: { list: UsersMap.online , action: ACTIONS.USER.CONNECT}});

        const message: any = await Message.findOne({}).sort({createdAt: -1});
        const author = await User.findById(message.userId);
        await PubSub.publish(UPDATE_CHAT_TRIGGER, {chatUpdated: { ...{message, ...{user: author}}, action: ACTIONS.MESSAGE.UPDATE}});
      } catch (e) {
        throw new UserInputError(e);
      }
      return userObject;
    },
    async signOutUser(_, data, context) {
      const {user} = await context;
      const {email} = data;
      if(email !== user.email) { return { list: UsersMap.online }; }
      UsersMap.remove(email);
      await PubSub.publish(ONLINE_USERS_TRIGGER, {onlineUsers: { list: UsersMap.online, action: ACTIONS.USER.DISCONNECT}});
      return { list: UsersMap.online };
    }
  },
  Subscription: {
    onlineUsers: {
      subscribe: () => PubSub.asyncIterator([ONLINE_USERS_TRIGGER]),
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
