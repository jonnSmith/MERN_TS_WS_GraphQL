import gql from "graphql-tag";

const ADD_WORKSPACE = gql`
  mutation AddWorkspace($input: WorkspaceInput!) {
    Workspace: addWorkspace(input: $input) {
      id
      name
      rating
    }
  }
`;

const WORKSPACE_LIST = gql`
  subscription workspaceList {
    workspaceList {
      action
      list {
        id
        name
        rating
      }
    }
  }`;

const DELETE_WORKSPACE = gql`
  mutation($id: ID!) {
    deleteWorkspace(id: $id) {
      id
      name
      rating
    }
  }
`;

export {ADD_WORKSPACE, WORKSPACE_LIST, DELETE_WORKSPACE};
