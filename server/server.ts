import express = require('express');
import cors = require('cors');
import {createServer} from "http";
import {makeExecutableSchema} from 'graphql-tools';
import ExecutableSchema from './src/schema';
import config from './../configs/config.app';
import {execute, subscribe} from "graphql";
import {SubscriptionServer} from 'subscriptions-transport-ws';
import {graphqlHTTP} from "express-graphql";

import {ContextMiddleware, OnConnectMiddleware} from "./src/core/midddleware/token";
import {CoreBus} from "./src/core/bus";

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

const PubSub = CoreBus.pubsub;

const app = express();
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
app.use(session({
  store: new MongoStore({mongooseConnection: mongoose.connection}),
  resave: true,
  saveUninitialized: true,
  secret: config.token.secret
}), cors());


const ws = createServer((req, res) => {
  res.writeHead(400);
  res.end();
})

ws.listen(config.server.ws, () => console.debug('websocket listening on port ', config.server.ws))

const subscriptionServer = SubscriptionServer.create({
  schema,
  execute,
  subscribe,
  onConnect: OnConnectMiddleware,
  onOperation: (message, params, webSocket) => {
    // console.debug('m', message.type);
    return params;
  }
}, {server: ws, path: `/${config.server.path}`});

app.use(`/${config.server.path}`, graphqlHTTP(async (request, response, graphQLParams) => (
    {
      schema,
      graphiql: true,
      context: ContextMiddleware(request),
    }
  )
  )
);

app.listen(config.server.port, () => console.log('http server listening on ', config.server.port))

// TODO: Apply updates for graphql-ws if any or cleanup commented code

// apollo.applyMiddleware({app});
// const server = createServer(app);
//
//
// server.listen(port, () => {
//   console.debug(`HTTP:WS CLUSTER STARTED :${port}`, server);
// });

// const wsServer = new Server({
//   server,
//   path: '/graphql',
//   host: 'localhost',
//   port,
//   perMessageDeflate: false,
// });
//
// useServer(
//     {
//       schema,
//       execute,
//       subscribe,
//     },
//     wsServer,
// );


// }
