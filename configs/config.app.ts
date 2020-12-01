/**
 * Replace these variables with environment variables
 * so that it reduces friction.
 */
export default {
  app: {
    name: "AppChat",
    sidebar: "Navigation"
  },
  server: {
    port: 5252,
    ws: 5151,
    host: 'localhost',
    path: 'graphql'
  },
  client: {
    port: 8484,
    host: 'localhost',
    apollo: {
      options: {
        ErrorPolicy: "none",
        FetchPolicy: "network-only",
      },
      wsLink: {
        lazy: true,
        reconnect: true,
        reconnectionAttempts: 10,
        timeout: 3000,
      }
    },
    formats: {
      message: {
        date: "YYYY/MM/DD, H:mm"
      }
    },
    theme: {
      color: "blue-green"
    },
    actions: {
      messages: {
        MESSAGES_UPDATED: "Update messages stream",
        MESSAGE_ADDED: "Get new message",
        MESSAGE_DELETED: "Delete message from stream",
        MESSAGE_UPDATED: "Update message data",
      },
      user: {
        USER_LOGIN: "Set user data",
        USER_LOGOUT: "Delete user data",
        USER_UPDATED: "User data updated",
      }
    },
  },
  mongodb: {
    uri: 'mongodb://localhost/neurochat',
  },
  token: {
    header: 'x-token',
    storage: 'token',
    secret: 'neurochat!secret',
    engine: 'localStorage',
  },
};
