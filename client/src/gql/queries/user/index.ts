import gql from "graphql-tag";

const userFields  = `{
  id
  email
  firstName
  lastName
  token
  workspace {
    id
    name
  }
}`;

const SIGN_IN = gql`
  mutation($email: String!, $password: String!) {
    user: signInUser(email: $email, password: $password) ${userFields}
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
    ) ${userFields}
  }
`;

const GET_ME = gql`
  {
    user: currentUser ${userFields}
  }
`;

export { SIGN_IN, SIGN_UP, GET_ME };
