import {Workspace} from "@shared/data/workspace";
import {WORKSPACES_TRIGGER} from "@backchat/core/bus/actions";
import {CoreBus} from "@backchat/core/bus";
import {ForbiddenError} from "@apollo/server/errors";
import {publishWorkspaces} from "../../core/adapters";

export const workspaceTypeDefs = `

  type Workspace {
    id: ID
    name: String
    rating: Int
  }

  input WorkspaceInput {
    name: String
    rating: Int
  }

  input WorkspaceFilterInput {
    limit: Int
  }

  extend type Query {
    workspaces(filter: WorkspaceFilterInput): [Workspace]
    workspace(id: String!): Workspace
  }

  extend type Mutation {
    addWorkspace(input: WorkspaceInput!, filter: WorkspaceFilterInput): [Workspace]
    editWorkspace(id: String!, input: WorkspaceInput!, filter: WorkspaceFilterInput): [Workspace]
    deleteWorkspace(id:ID!, filter: WorkspaceFilterInput): [Workspace]
  }
  
  extend type Subscription {
    workspaceList: WorkspaceData
  }
  
  type WorkspaceData {
    list: [Workspace]
    action: String
  }

`;

const pubsub = CoreBus.pubsub;

export const workspaceResolvers: any = {
  Query: {
    async workspaces(_, { filter }) {
      return publishWorkspaces(null);
    },
    async workspace(_, { id }) {
      const workspace: any = await Workspace.findById(id);
      return workspace.toObject();
    },
  },
  Mutation: {
    async addWorkspace(_, { input, filter }) {
      await Workspace.create(input);
      return publishWorkspaces(pubsub);
    },
    async editWorkspace(_, { id, input }) {
      await Workspace.findByIdAndUpdate(id, input, {new: true});
      return publishWorkspaces(pubsub);
    },
    async deleteWorkspace(_, { id, filter }, context) {
      try {
        await Workspace.findByIdAndRemove(id);
        return publishWorkspaces(pubsub);
      } catch(e) {
        throw new ForbiddenError("Workspace forbidden to delete.");
      }
    }
  },
  Subscription: {
    workspaceList: {
      subscribe: () => pubsub.asyncIterator([WORKSPACES_TRIGGER]),
    }
  }
};
