import gql from 'graphql-tag';

export const CREATE_MESSAGE = gql`
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

export const MESSAGE_CREATED = gql`
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

export const DELETE_MESSAGE = gql`
  mutation($id: ID!, $filter: MessageFilterInput) {
    deleteMessage(id: $id, filter: $filter) {
      id
    }
  }
`;

export const MESSAGE_DELETED = gql`
  subscription {
    messageDeleted {
      message {
        id
      }
    }
  }
`;

export const GET_PAGINATED_MESSAGES = gql`
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

export const MESSAGE_UPDATED = gql`
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

export const GET_MESSAGES_COUNT = gql`
  query {
    messagesCount {
      count
    }
  }
`;
