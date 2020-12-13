import {Message} from "@shared/data/message";
import {User} from "@shared/data/user";
import {Workspace} from "@shared/data/workspace";
import {UserInputError, AuthenticationError} from "@apollo/server/errors";
import {CoreBus} from "@backchat/core/bus";
import {ONLINE_USERS_TRIGGER} from "@backchat/core/bus/actions";
import {UsersMap} from "@backchat/core/bus/users";
import {
  setMessage,
  setOnlineUsers,
  signUser,
  queryUser,
} from "@backchat/core/adapters";
import {Document, DocumentQuery} from "mongoose";
import {ID} from "graphql-ws";

import * as SharedTypes from "@shared/types";
import * as SharedConstants from "@shared/constants";

const AuthenticationCall = async (args) => {
  const {document, key, password, update, pubsub, map, online} = args;
  const {user,code}  = await signUser({document, key, update, password});
  // console.debug("code", code);
  if(!user.email || !code) {
    throw new UserInputError("Bad credentials");
  }
  const {list} = await setOnlineUsers({pubsub, user, map, online});
  // console.debug("list", list);
  const messageDocument: any = Message.findOne({}).sort({createdAt: -1});
  const {message} = await setMessage({ document: messageDocument, user, pubsub });
  // console.debug("message", message);
  return {user,code,message,list};
}

// TODO: Remove password field from User data type

const responseDataType = `ResponseData`;

const responseData = `type ${responseDataType} {
  user: User
  list: [OnlineUser]
  code: String
  message: Message
}`;


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
    signInUser(email: String!, password: String!): ${responseDataType}
    signUpUser(email: String!, password: String!, firstName: String!, lastName: String): ${responseDataType}
    signOutUser(email: String!): OnlineUsersData
  }
  extend type Subscription {
    onlineUsers: OnlineUsersData
  }
  ${responseData}
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

      const query: SharedTypes.DocumentQueryType = User.findByIdAndUpdate(id, {firstName, lastName, workspaceId}, {new: true});
      const {user: savedUser} = (key && uid === id) ? await queryUser({query}) : SharedConstants.DEFAULT_USER;
      const messageQuery: DocumentQuery<Document | null, Document, {}> | null = Message.findOne({}).sort({createdAt: -1});
      const {message} = await setMessage({document: messageQuery, user: savedUser, pubsub: PubSub});
      return savedUser;
    },
    async signUpUser(_, data, context) {
      const { email, password, firstName, lastName} = data;
      const {document, key, uid} = await context;
      try {
        const userDocument: any = User.create({email, password, firstName, lastName});
        const {user,code,list,message} = await AuthenticationCall({
          update: true,
          pubsub: PubSub,
          map: UsersMap,
          online: true,
          document: userDocument,
          key,
          password: undefined});
        user.token = code;
        return {user, code};
      } catch (e) {
        console.debug(e);
        return SharedConstants.DEFAULT_USER_DATA;
      }
    },
    async signInUser(_, data, context) {
      const { email, password} = data;
      const {key} = await context;
      if(UsersMap.get(email)) { throw new AuthenticationError("User is signed in");  }
      if(!email || !password) { throw new UserInputError("Bad data");  }
      try {
        const userDocument: any = User.findOne({email});
        return await AuthenticationCall({
          update: true,
          pubsub: PubSub,
          map: UsersMap,
          online: true,
          document: userDocument,
          key,
          password});
      } catch (e) {
        throw new AuthenticationError(e);
      }
    },
    async signOutUser(_, data, context) {
      const {document, key, uid} = await context;
      if(!data.email) { return SharedConstants.DEFAULT_LIST };
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
