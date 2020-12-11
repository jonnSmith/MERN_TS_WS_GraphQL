import Workspace from './workspace.model';
import {WORKSPACES_TRIGGER} from "../../core/bus/actions";
import {CoreBus} from "../../core/bus";

/**
 * Export a string which contains our GraphQL type definitions.
 */
export const workspaceTypeDefs = `

  type Workspace {
    id: ID!
    name: String!
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
    addWorkspace(input: WorkspaceInput!): Workspace
    editWorkspace(id: String!, input: WorkspaceInput!): Workspace
  }
  
  extend type Subscription {
    workspaceList: WorkspaceData
  }
  
  type WorkspaceData {
    list: [Workspace]
    action: String
  }

`;

const PubSub = CoreBus.pubsub;

export const workspaceResolvers: any = {
  Query: {
    async workspaces(_, { filter }) {
      const workspaces: any[] = await Workspace.find({}, null, filter);
      return workspaces.map(workspace => workspace.toObject());
    },
    async workspace(_, { id }) {
      const workspace: any = await Workspace.findById(id);
      return workspace.toObject();
    },
  },
  Mutation: {
    async addWorkspace(_, { input }) {
      const workspace: any = await Workspace.create(input);
      return workspace.toObject();
    },
    async editWorkspace(_, { id, input }) {
      const workspace: any = await Workspace.findByIdAndUpdate(id, input);
      return workspace.toObject();
    },
  },
  Subscription: {
    workspaceList: {
      subscribe: () => PubSub.asyncIterator([WORKSPACES_TRIGGER]),
    }
  }
};
