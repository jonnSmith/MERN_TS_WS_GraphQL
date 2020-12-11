import gql from "graphql-tag";

const ADD_WORKSPACE = gql`
  mutation AddWorkspace($input: WorkspaceInput!) {
    Workspace: addWorkspace(input: $input) {
      name
      rating
    }
  }
`;

export {ADD_WORKSPACE};
