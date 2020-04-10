import gql from "graphql-tag";

const CREATE_MESSAGE = gql`
  mutation CreateMessage($text: String!, $filter: MessageFilterInput) {
    message: createMessage(text: $text, filter: $filter) {
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

const MESSAGE_CREATED = gql`
  subscription {
    messageCreated {
      message {
        id
        text
        createdAt
        user {
          id
          email
        }
      }
    }
  }
`;

const DELETE_MESSAGE = gql`
  mutation($id: ID!, $filter: MessageFilterInput) {
    deleteMessage(id: $id, filter: $filter) {
      id
    }
  }
`;

const MESSAGE_DELETED = gql`
  subscription {
    messageDeleted {
      message {
        id
      }
    }
  }
`;

const GET_PAGINATED_MESSAGES = gql`
  query($filter: MessageFilterInput) {
    stream(filter: $filter) {
      messages {
        id
        text
        createdAt
        user {
          id
          email
        }
      }
    }
  }
`;

const MESSAGE_UPDATED = gql`
  subscription {
    messageUpdated {
      messages {
        id
        text
        createdAt
        user {
          id
          email
        }
      }
    }
  }
`;

const MESSAGES_COUNT = gql`
  query {
    count {
      total
    }
  }
`;

export {
  MESSAGE_CREATED,
  MESSAGE_DELETED,
  MESSAGE_UPDATED,
  MESSAGES_COUNT,
  CREATE_MESSAGE,
  DELETE_MESSAGE,
  GET_PAGINATED_MESSAGES
};
