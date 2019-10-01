import gql from 'graphql-tag';

export const SIGN_IN = gql`
  mutation($email: String!, $password: String!) {
    loginUser(email: $email, password: $password)
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