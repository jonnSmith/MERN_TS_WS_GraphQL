import express = require('express');
import cors = require('cors');
import {createServer, Server} from "http";
import {makeExecutableSchema} from 'graphql-tools';
import ExecutableSchema from './src/schema';
import config from './../configs/config.app';
import {execute, subscribe} from "graphql";
import {graphqlHTTP} from "express-graphql";
import {ContextMiddleware} from "./src/core/midddleware/token";
import { Server as WSS} from 'ws'; // yarn add ws
import { useServer } from 'graphql-ws/lib/use/ws';

const schema = makeExecutableSchema(ExecutableSchema);
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

// TODO: Check clusters and add a common bus (Redis) if needed
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

const app = express();
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
app.use(session({
  store: new MongoStore({mongooseConnection: mongoose.connection}),
  resave: true,
  saveUninitialized: true,
  secret: config.token.secret
}), cors());

const server: Server = createServer((req, res) => {
  res.writeHead(400);
  res.end();
})

const wss = new WSS({
  server,
  path: `/${config.server.path}`,
});

useServer(
  {
    schema,
    execute,
    subscribe,
    onConnect: async (ctx) => {
      // TODO: add preloaded messages mutation on connection
      await ContextMiddleware(ctx.extra.request);
    },
    onSubscribe: async (ctx) => {
      // TODO: add additional logic checking
      await ContextMiddleware(ctx.extra.request);
    },
    onNext: async (ctx) => {
      // TODO: resolve WS Cluster problem through process/worker bus
      await ContextMiddleware(ctx.extra.request);
    },
    onError: async (ctx, message) => {
      // TODO: add acceptable debugger
      console.debug('error', message);
    }
  },
  wss,
);

server.listen(config.server.ws,() =>  console.debug(`websocket started on ${config.server.ws}`));

app.use(`/${config.server.path}`, graphqlHTTP(
  async (request, response, graphQLParams) => (
    {
      schema,
      graphiql: true,
      context: ContextMiddleware(request),
    }
  )
));

app.listen(config.server.port, () => console.debug(`http graphql started on ${config.server.port}`));

// }
