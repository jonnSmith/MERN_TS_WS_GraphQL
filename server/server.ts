import * as jwt from 'jsonwebtoken';
import express = require('express');
import {createServer} from "http";
import {ApolloServer} from 'apollo-server-express';
import {makeExecutableSchema} from 'graphql-tools';
import scheme from './src/schema';
import config from './../configs/config.app';
import User from "./src/common/user/user.model";
import {execute, subscribe} from "graphql";
import {Server} from 'ws';
// tslint:disable-next-line:no-submodule-imports
import { useServer } from 'graphql-ws/lib/use/ws';

const schema = makeExecutableSchema(scheme);
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

// const cluster = require('cluster');
// const numCPUs = require('os').cpus().length;
// if (cluster.isMaster) {
//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }
//   cluster.on('exit', (worker, code, signal) => {
//     console.log(`worker ${worker.process.pid} died`);
//   });
// } else {
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

  const port = config.server.port;
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

  const wsServer = new Server({
    server,
    path: '/graphql',
    host: 'localhost',
    port,
  });

  useServer(
      {
        schema,
        execute,
        subscribe,
      },
      wsServer,
  );

  server.listen(port, 'localhost', () => {
    console.debug(`HTTP:WS CLUSTER STARTED :${port}`, wsServer.address(), server.address());
  });


// }
