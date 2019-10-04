import gql from 'graphql-tag';

export const CREATE_MESSAGE = gql`
  mutation CreateMessage($text: String!) {
    message: createMessage(text: $text) {
      id
      text
      createdAt
      user {
        id
        email
      }
    }
  }
`;