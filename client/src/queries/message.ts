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

export const MESSAGE_CREATED = gql`
  subscription {
    messageCreated {
      message {
        id
        text
        createdAt
        user {
          id
          username
        }
      }
    }
  }
`;

export const GET_PAGINATED_MESSAGES_WITH_USERS = gql`
  query($cursor: String, $limit: Int!) {
    messages(cursor: $cursor, limit: $limit)
      @connection(key: "MessagesConnection") {
      edges {
        id
        text
        createdAt
        user {
          id
          username
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const GET_ALL_MESSAGES_WITH_USERS = gql`
  query {
    messages(order: "DESC") @connection(key: "MessagesConnection") {
      edges {
        id
        text
        createdAt
        user {
          id
          username
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;

export const DELETE_MESSAGE = gql`
  mutation($id: ID!) {
    deleteMessage(id: $id)
  }
`;
