import {workspaceData, workspaceFields} from "@shared/queries";
import gql from "graphql-tag";

const ADD_WORKSPACE = gql`
  mutation addWorkspace($input: WorkspaceInput!) {
    workspaces: addWorkspace(input: $input) ${workspaceFields}
  }
`;

const WORKSPACE_LIST = gql`
  subscription workspaceList {
    workspaceList ${workspaceData}
  }`;

const DELETE_WORKSPACE = gql`
  mutation deleteWorkspace($id: ID!) {
    workspaces: deleteWorkspace(id: $id) ${workspaceFields}
  }
`;

export {ADD_WORKSPACE, WORKSPACE_LIST, DELETE_WORKSPACE};
