import Workspace from '../workspace/workspace.model';
import {UserInputError} from '@apollo/server/errors';
import User from './user.model';
import {CoreBus} from "../../core/bus";
import {ONLINE_USERS_TRIGGER} from "../../core/bus/actions";
import Message from "../message/message.model";
import {UsersMap} from "../../core/bus/users";
import {AuthenticationError} from "apollo-server-errors";
import {
  DEFAULT_USER,
  DocumentQueryType,
  setMessage,
  setOnlineUsers,
  signUser,
  queryUser,
  DEFAULT_USER_DATA, DEFAULT_LIST
} from "../transformers";
import {Document, DocumentQuery} from "mongoose";
import {IUserModel} from "../../../../client/src/data/user/interfaces";
import {ID} from "graphql-ws";

// TODO: Remove password field from User data type

export const userTypeDefs = `

  type User {
    id: ID
    workspaceId: ID
    email: String
    password: String
    firstName: String
    lastName: String
    token: String
    workspace: Workspace
  }

  input UserFilterInput {
    limit: Int
  }

  extend type Query {
    users(filter: UserFilterInput): [User]
    user(id: ID): User
  }

  input UserInput {
    email: String
    password: String
    firstName: String
    lastName: String
    workspaceId: ID
  }
  
  input UserUpdate {
    id: ID
    firstName: String
    lastName: String
    workspaceId: ID
  }

  extend type Mutation {
    updateUser(firstName: String, lastName: String, id: ID!, workspaceId: ID): User
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
    async updateUser(_, data, context) {
      const {document, key, id: uid} = await context;
      const { id, firstName, lastName, workspaceId } = data;

      const query: DocumentQueryType = User.findByIdAndUpdate(id, {firstName, lastName, workspaceId}, {new: true});
      const {user: savedUser} = (key && uid === id) ? await queryUser({query}) : DEFAULT_USER;
      const messageQuery: DocumentQuery<Document | null, Document, {}> | null = Message.findOne({}).sort({createdAt: -1});
      const {message} = await setMessage({document: messageQuery, user: savedUser, pubsub: PubSub});
      return savedUser;
    },
    async signUpUser(_, data, context) {
      const { email, password, firstName, lastName} = data;
      const {document, key, uid} = await context;
      const userObject = DEFAULT_USER.user;
    //   try {
    //     const userDocument = User.create({email, password, firstName, lastName});
    //     const {user} = await signUser(userDocument, key, true);
    //     userObject = {...user};
    //     const {list} = await setOnlineUsers(PubSub, userObject, UsersMap, true);
    //     const messageDocument: any = Message.findOne({}).sort({createdAt: -1});
    //     const {message} = await setMessage(messageDocument, userObject, PubSub);
    //
    //   } catch (e) {
    //     throw new UserInputError(e);
    //   }
      return userObject;
    },
    async signInUser(_, data, context) {
      const { email, password} = data;
      const {document, key, uid} = await context;
      if(UsersMap.get(email)) {  console.debug(email, "Already signed in"); return DEFAULT_USER.user;  }
      if(!email || !password) {  console.debug(email, "Wrong data"); return DEFAULT_USER.user;  }
      try {
        const userDocument: any = User.findOne({email});
        const {user,code}  = await signUser({document: userDocument, key, update: true, password});
        if(!user.email || !code) { return DEFAULT_USER_DATA }
        const {list} = await setOnlineUsers({pubsub: PubSub, user, map: UsersMap, online: true});
        const messageDocument: any = Message.findOne({}).sort({createdAt: -1});
        const {message} = await setMessage({ document: messageDocument, user, pubsub: PubSub });
        return {...user};
      } catch (e) {
        console.debug(e);
        return DEFAULT_USER.user;
      }
    },
    async signOutUser(_, data, context) {
      const {document, key, uid} = await context;
      if(!data.email) { return DEFAULT_LIST };
      const {list} = await setOnlineUsers({pubsub: PubSub, user: data, map: UsersMap, online: false});
      return {list};
    }
  },
  Subscription: {
    onlineUsers: {
      subscribe: () => PubSub.asyncIterator([ONLINE_USERS_TRIGGER]),
    }
  },
  User: {
    async workspace(user: { workspaceId: ID }) {
      if (user.workspaceId) {
        const workspace: any = await Workspace.findById(user.workspaceId);
        return workspace ? workspace.toObject() : {};
      }
      return {};
    },
  },
};
