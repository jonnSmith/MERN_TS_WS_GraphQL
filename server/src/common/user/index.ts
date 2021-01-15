import {User} from "@shared/data/user";
import {Workspace} from "@shared/data/workspace";
import {UserInputError, AuthenticationError} from "@apollo/server/errors";
import {CoreBus} from "@backchat/core/bus";
import {ONLINE_USERS_TRIGGER} from "@backchat/core/bus/actions";
import {UsersMap} from "@backchat/core/bus/users";
import {QueryAdapters} from "@backchat/core/adapters";
import {payloadData, payloadDataType} from "@shared/queries";
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
    firstName: String
    lastName: String
    workspaceId: ID
  }
  extend type Mutation {
    updateUser(firstName: String, lastName: String, workspaceId: ID): ${payloadDataType}
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
      const { firstName, lastName, workspaceId } = data;
      const payload = new Map();
      const loaded:  any = {};

      const document = User
        .findByIdAndUpdate(id, {firstName, lastName, workspaceId}, {new: true});
      payload.set("user", await QueryAdapters.signUser(document, token, false, null));
      loaded.user = payload.get("user");
      console.debug("update", loaded.user );
      if(loaded.user?.token) {
        payload.set("token", loaded.user?.token)
          .set("message", await QueryAdapters.publishTopMessage(pubsub))
          .set("list", await QueryAdapters.publishOnlineUsers(loaded.user,UsersMap,true, pubsub))
      }
      payload.set("workspaces", await QueryAdapters.publishWorkspaces(pubsub))
      payload.forEach(function(value, key) { loaded[key] = value; });
      payload.clear();
      return loaded
    },
    async signUpUser(_, data, context) {
      const payload = new Map();
      const loaded:  any = {};
      const { email, password, firstName, lastName, workspaceId} = data;
      if(!email || !password) { throw new UserInputError("Data is missing");  }
      try {
        const document = User.create({email, password, firstName, lastName, workspaceId});
        const {token} = await context;
        payload.set("user", await QueryAdapters.signUser(document, token, true, password))
        loaded.user = payload.get("user");
        if(loaded.user?.token) {
          payload.set("token", loaded.user?.token)
            .set("message", await QueryAdapters.publishTopMessage(null))
            .set("list", await QueryAdapters.publishOnlineUsers(loaded.user,UsersMap,true, pubsub))
        }
        payload.set("workspaces", await QueryAdapters.publishWorkspaces(null))
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
        payload.set("user", await QueryAdapters.signUser(User.findOne({email}), token, true, password))
        loaded.user = {...payload.get("user")};
        if(loaded.user?.token) {
          payload.set("token", loaded.user?.token)
            .set("message", await QueryAdapters.publishTopMessage(null))
            .set("list", await QueryAdapters.publishOnlineUsers(loaded.user,UsersMap,true,pubsub));
        }
        payload.set("workspaces", await QueryAdapters.publishWorkspaces(null))
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
      const {list} = await QueryAdapters.publishOnlineUsers(user, UsersMap,false, pubsub);
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
