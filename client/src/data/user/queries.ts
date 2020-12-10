import {UserFields} from "@appchat/data/user/constants";
import gql from "graphql-tag";

const SIGN_IN = gql`
  mutation($email: String!, $password: String!) {
    user: signInUser(email: $email, password: $password) ${UserFields}
  }
`;

const SIGN_UP = gql`
  mutation(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String
  ) {
    user: signUpUser(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
    ) ${UserFields}
  }
`;

const UPDATE_USER = gql`
  mutation(
    $firstName: String
    $lastName: String
    $id: ID!
  ) {
    user: updateUser(id: $id, firstName: $firstName, lastName: $lastName) ${UserFields}
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
