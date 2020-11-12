import gql from "graphql-tag";

const SIGN_IN = gql`
  mutation($email: String!, $password: String!) {
    token: signInUser(email: $email, password: $password)
  }
`;

const SIGN_UP = gql`
  mutation(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String
  ) {
    token: signUpUser(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
    )
  }
`;

const GET_ME = gql`
  {
    currentUser {
      id
      email
      firstName
      lastName
      workspace {
        id
        name
      }
    }
  }
`;

export { SIGN_IN, SIGN_UP, GET_ME };
