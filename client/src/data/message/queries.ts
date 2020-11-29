import gql from "graphql-tag";

const CREATE_MESSAGE = gql`
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

const DELETE_MESSAGE = gql`
  mutation($id: ID!) {
    deleteMessage(id: $id) {
      id
    }
  }
`;

export {
    CREATE_MESSAGE,
    DELETE_MESSAGE
};
