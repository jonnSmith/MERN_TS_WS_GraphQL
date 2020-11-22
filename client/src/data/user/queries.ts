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

const GET_ME = gql`
  {
    user: currentUser ${UserFields}
  }
`;

export { SIGN_IN, SIGN_UP, GET_ME };
