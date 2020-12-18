import {User} from "@shared/data/user";
import {Workspace} from "@shared/data/workspace";
import {UserInputError, AuthenticationError} from "@apollo/server/errors";
import {CoreBus} from "@backchat/core/bus";
import {ONLINE_USERS_TRIGGER} from "@backchat/core/bus/actions";
import {UsersMap} from "@backchat/core/bus/users";
import {publishOnlineUsers, publishTopMessage, publishWorkspaces, signUser} from "@backchat/core/adapters";
import { payloadData, payloadDataType} from "@shared/queries";
import {ID} from "graphql-ws";
import * as SharedConstants from "@shared/constants";

export const userTypeDefs = `
  type User {
    id: ID
    workspaceId: ID
    email: String
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
    signInUser(email: String!, password: String!): ${payloadDataType}
    signUpUser(email: String!, password: String!, firstName: String!, lastName: String, workspaceId: ID): ${payloadDataType}
    signOutUser(email: String!, id: ID, firstName: String, lastName: String, workspaceId: ID): OnlineUsersData
  }
  extend type Subscription {
    onlineUsers: OnlineUsersData
  }
  ${payloadData}
  type OnlineUsersData {
    list: [OnlineUser]
    action: String
  }
  type OnlineUser {
    email: String
    typing: Boolean
  }
`;

const pubsub = CoreBus.pubsub;

export const userResolvers = {
  Query: {
    async users(_, { filter = {} }) {
      const users: any[] = await User.find({}, null, filter);
      return users.map(u => (u)?.toObject() );
    },
    async user(_, { id }) {
      const user = await User.findById(id);
      return (user)?.toObject();
    },
  },
  Mutation: {
    async updateUser(_, data, context) {
      const {token, id} = await context;
      const { id: uid, firstName, lastName, workspaceId } = data;

      const user = await User
        .findByIdAndUpdate(uid, {firstName, lastName, workspaceId}, {new: true})
        .lean({ virtuals: true });

      const {message} = await publishTopMessage(pubsub);
      return {message, user};
    },
    async signUpUser(_, data, context) {
      const payload = new Map();
      const loaded:  any = {};
      const { email, password, firstName, lastName, workspaceId} = data;
      if(!email || !password) { throw new UserInputError("Data is missing");  }
      try {
        const document = User.create({email, password, firstName, lastName, workspaceId});
        const {token} = await context;
        payload.set("user", await signUser(document, token, true, password))
        loaded.user = payload.get("user");
        if(loaded.user?.token) {
          payload.set("token", loaded.user?.token)
            .set("message", await publishTopMessage(null))
            .set("list", await publishOnlineUsers(loaded.user,UsersMap,true, pubsub))
        }
        payload.set("workspaces", await publishWorkspaces(null))
        payload.forEach(function(value, key) { loaded[key] = value; });

        payload.clear();
        return loaded
      } catch (e) {
        throw new AuthenticationError(e);
      }
    },
    async signInUser(_, data, context) {
      const payload = new Map();
      const loaded: any = {};
      const {email, password} = data;
      const {token} = await context;
      // if(UsersMap.get(email)) { throw new AuthenticationError("User is signed in");  }
      if(!email || !password) { throw new UserInputError("Missing sign in data");  }
      try {
        payload.set("user", await signUser(User.findOne({email}), token, true, password))
        loaded.user = {...payload.get("user")};
        if(loaded.user?.token) {
          payload.set("token", loaded.user?.token)
            .set("message", await publishTopMessage(null))
            .set("list", await publishOnlineUsers(loaded.user,UsersMap,true,pubsub));
        }
        payload.set("workspaces", await publishWorkspaces(null))
        payload.forEach(function(value, key) { loaded[key] = value; });
        payload.clear();
        return loaded
      } catch (e) {
        throw new AuthenticationError(e);
      }
    },
    async signOutUser(_, data, context) {
      const user = {...data};
      const {token, id} = await context;
      if(!user?.email) { throw new AuthenticationError("Missing logout data"); }
      const {list} = await publishOnlineUsers(user, UsersMap,false, pubsub);
      return {list};
    }
  },
  Subscription: {
    onlineUsers: {
      subscribe: () => pubsub.asyncIterator([ONLINE_USERS_TRIGGER]),
    }
  },
  User: {
    async workspace(user: { workspaceId: ID }) {
      if (user.workspaceId) {
        return (await Workspace.findById(user.workspaceId))?.toObject();
      }
      return {};
    },
  },
};
