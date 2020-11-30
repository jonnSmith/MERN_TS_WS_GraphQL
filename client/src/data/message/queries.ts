import gql from "graphql-tag";

const CREATE_MESSAGE = gql`
  mutation CreateMessage($text: String!) {
    message: createMessage(text: $text) {
      id
      text
      createdAt
      user {
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

const CHAT_UPDATED = gql`
  subscription chatUpdated {
    chatUpdated {
      action
      message {
        id
        text
        createdAt
        user {
          email
        }
      }
    }
  }`;

const PRELOAD_MESSAGE = gql`
  {
    message: preloadMessage {
        id
        text
        createdAt
        user {
          email
        }
    }
  }
`;

export {
    CREATE_MESSAGE,
    DELETE_MESSAGE,
    CHAT_UPDATED,
    PRELOAD_MESSAGE
};
