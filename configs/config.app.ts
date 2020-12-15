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
        timeout: 100,
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
    form: {
      debounce: {
        value: 100,
        form: 1000
      }
    },
    actions: {
      messages: {
        MESSAGES_UPDATED: "Update messages stream",
        MESSAGE_ADDED: "Get new message",
        MESSAGE_DELETED: "Delete message from stream",
        MESSAGE_UPDATED: "Update message data",
        MESSAGE_PRELOADED: "Preload latest message",
        MESSAGE_USER: "Update user fields"
      },
      user: {
        USER_LOGIN: "Set user data",
        USER_LOGOUT: "Delete user data",
        USER_UPDATED: "User data updated",
        ONLINE_CHANGED: "Online users list changed",
        ONLINE_UPDATED: "Online users updated",
        ONLINE_TOGGLE: "Toggle online panel",
        ONLINE_OPEN: "Press toggle button",
        ONLINE_CLOSE: "Click on opened panel",
      },
      workspace: {
        WORKSPACE_ADDED: "Add new workspace",
        WORKSPACE_DELETED: "Delete workspace",
        WORKSPACES_CHANGED: "Workspaces list changed",
        WORKSPACES_UPDATED: "Workspaces list updated"
      },
      payload: {
        HANDLE_PAYLOAD: "Handle payload data from GraphQL response",
        PROCESS_PAYLOAD: "Data processing payload data",
        SEND_PAYLOAD: "Send payload processed separately",
      }
    },
  },
  mongodb: {
    uri: 'mongodb://localhost/neurochat',
  },
  token: {
    header: 'x-token',
    storage: 'token',
    secret: 'appchat!secret',
    engine: 'sessionStorage',
  },
}
