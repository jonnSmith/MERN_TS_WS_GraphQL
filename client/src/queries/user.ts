import gql from 'graphql-tag';

export const SIGN_IN = gql`
  mutation($email: String!, $password: String!) {
    token: signInUser(email: $email, password: $password)
  }
`;

export const SIGN_UP = gql`
  mutation($email: String!, $password: String!, $firstName: String!, $lastName: String) {
    token: signUpUser(email: $email, password: $password, firstName: $firstName, lastName: $lastName)
 }
`;

export const GET_ME = gql`
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