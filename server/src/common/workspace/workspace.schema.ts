import Workspace from './workspace.model';
import {ACTIONS, WORKSPACES_TRIGGER} from "../../core/bus/actions";
import {CoreBus} from "../../core/bus";
import Message from "../message/message.model";
import {ForbiddenError} from "@apollo/server/errors";

/**
 * Export a string which contains our GraphQL type definitions.
 */
export const workspaceTypeDefs = `

  type Workspace {
    id: ID
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
    addWorkspace(input: WorkspaceInput!, filter: WorkspaceFilterInput): Workspace
    editWorkspace(id: String!, input: WorkspaceInput!, filter: WorkspaceFilterInput): Workspace
    deleteWorkspace(id:ID!, filter: WorkspaceFilterInput): Workspace
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
      const list = workspaces.map(workspace => workspace.toObject())
      await PubSub.publish(WORKSPACES_TRIGGER, {workspaceList: { list, action: ACTIONS.WORKSPACE.UPDATE}});
      return list;
    },
    async workspace(_, { id }) {
      const workspace: any = await Workspace.findById(id);
      return workspace.toObject();
    },
  },
  Mutation: {
    async addWorkspace(_, { input, filter }) {
      const workspace: any = await Workspace.create(input);
      const workspaces: any[] = await Workspace.find({}, null, filter);
      const list = workspaces.map(ws => ws.toObject())
      await PubSub.publish(WORKSPACES_TRIGGER, {workspaceList: { list, action: ACTIONS.WORKSPACE.UPDATE}});
      return workspace.toObject();
    },
    async editWorkspace(_, { id, input }) {
      const workspace: any = await Workspace.findByIdAndUpdate(id, input, {new: true});
      return workspace.toObject();
    },
    async deleteWorkspace(_, { id, filter }, context) {
      try {
        const workspace: any = await Workspace.findByIdAndRemove(id);
        const workspaces: any[] = await Workspace.find({}, null, filter);
        const list = workspaces.map(ws => ws.toObject())
        await PubSub.publish(WORKSPACES_TRIGGER, {workspaceList: { list, action: ACTIONS.WORKSPACE.UPDATE}});
        return workspace.toObject();
      } catch(e) {
        throw new ForbiddenError('Workspace forbidden to delete.');
      }
    }
  },
  Subscription: {
    workspaceList: {
      subscribe: () => PubSub.asyncIterator([WORKSPACES_TRIGGER]),
    }
  }
};
