import * as jwt from 'jsonwebtoken';
import express = require('express');
import {createServer} from "http";
import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import ExecutableSchema from './src/schema';
import config from './../configs/config.app';
import User from "./src/common/user/user.model";
import { SubscriptionServer } from 'subscriptions-transport-ws';
import {execute, subscribe} from "graphql";

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
    useCreateIndex: true,
    useFindAndModify: false
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
  const apollo = new ApolloServer({
    schema,
    formatError(error) {
      console.error(error);
      return error;
    },
    async context({req}) {
      try {
        const token = req && req.headers && req.headers[config.token.header];
        const data: any = jwt.verify(token as string, config.token.secret);
        const userDocument: any = await User.findById(data?.id);
        return userDocument.toObject();
      } catch(e) {
        // throw new AuthenticationError(e);
        return null;
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
  apollo.applyMiddleware({app});
  const server = createServer(app);

  server.listen(PORT, () => {
    // tslint:disable-next-line:no-unused-expression
    const ws = new SubscriptionServer({
      schema,
      execute,
      subscribe,
      onConnect: (connectionParams) => {
        // @ts-ignore
        if (!connectionParams?.token) {
          return null;
        }
        try {
          // @ts-ignore
          const data: any = jwt.verify(connectionParams?.token as string, config.token.secret);
          return data?.id ? {data} : null;
        } catch (e) {
          console.debug(e);
          return null;
        }
      },
    }, {
      server,
      path: '/graphql',
    });
    ws.server.addListener('connection', (client => {console.debug(client)}))
    // console.debug('HTTP:WS CLUSTER STARTED', ws);
  });
}
