import {payloadDataFields, userFields} from "@shared/queries";
import gql from "graphql-tag";

const SIGN_IN = gql`
  mutation SignInUser($email: String!, $password: String!) {
    payload: signInUser(email: $email, password: $password) ${payloadDataFields}
  }
`;

const SIGN_UP = gql`
  mutation(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String
    $workspaceId: ID
  ) {
    payload: signUpUser(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      workspaceId: $workspaceId
    ) ${payloadDataFields}
  }
`;

const UPDATE_USER = gql`
  mutation(
    $firstName: String
    $lastName: String
    $workspaceId: ID
  ) {
    payload: updateUser(firstName: $firstName, lastName: $lastName, workspaceId: $workspaceId) ${payloadDataFields}
  }`;

const SIGN_OUT = gql`
  mutation($email: String!) {
    OnlineUsersData: signOutUser(email: $email) {
      action
      list {
        email
        typing
      }
    }
  }`;

const ONLINE_USERS = gql`
  subscription onlineUsers {
    onlineUsers {
      action
      list {
        email
        typing
      }
    }
  }`;

export { SIGN_IN, SIGN_UP, UPDATE_USER, ONLINE_USERS, SIGN_OUT };
