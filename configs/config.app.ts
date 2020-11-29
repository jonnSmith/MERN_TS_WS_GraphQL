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
    port: 3000,
  },
  client: {
    port: 8080,
  },
  mongodb: {
    uri: 'mongodb://localhost/neurochat',
  },
  token: {
    header: 'x-token',
    storage: 'token',
    secret: 'neurochat!secret',
    engine: 'sessionStorage',
  },
};
