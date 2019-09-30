import * as jwt from 'jsonwebtoken';
import express = require('express');
import http = require('http');
import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import ExecutableSchema from './src/schema';
import User from './src/common/user/user.model';
import config from './../configs/config.app';

const schema = makeExecutableSchema(ExecutableSchema);

/**
 * Connect to the mongodb database using
 * the mongoose library.
 */
const mongoose = require('mongoose');
mongoose.connect(
  config.mongodb.uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }
);

const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  /**
   * Create the server which we will send our
   * GraphQL queries to.
   */
  const server = new ApolloServer({
    schema,
    formatError(error) {
      console.log(error);
      return error;
    },
    async context({req}) {
      const token = req && req.headers && req.headers.authorization;
      if (token) {
        const data: any = jwt.verify(token, config.token.secret);
        const user = data.id ? await User.findById(data.id) : null;
        return {user};
      }
    },
  });

  const PORT = config.server.port;
  const app = express();

  const session = require('express-session');
  const MongoStore = require('connect-mongo')(session);
  app.use(session({
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    resave: true,
    saveUninitialized: true,
    secret: config.token.secret
  }));
  server.applyMiddleware({app});

  const httpServer = http.createServer(app);
  server.installSubscriptionHandlers(httpServer);

  httpServer.listen(PORT, () => {
    console.log(`${process.pid} Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    console.log(`${process.pid} Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`);
  });

}
