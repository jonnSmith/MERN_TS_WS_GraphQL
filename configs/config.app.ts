/**
 * Replace these variables with environment variables
 * so that it reduces friction.
 */
export default {
  app: {
    name: "NeuroChat 0.0.1",
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
      }
    },
    formats: {
      message: {
        date: "YYYY/MM/DD, H:mm"
      }
    }
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
