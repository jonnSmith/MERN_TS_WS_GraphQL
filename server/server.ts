import express = require('express');
import cors = require('cors');
import {createServer, Server} from "http";
import {makeExecutableSchema} from 'graphql-tools';
import ExecutableSchema from './src/schema';
import config from './../configs/config.app';
import {execute, subscribe} from "graphql";
import {graphqlHTTP} from "express-graphql";
import {ContextMiddleware, WSMiddleware} from "./src/core/midddleware/token";
import {Server as WSS} from 'ws';
import {useServer} from 'graphql-ws/lib/use/ws';
import {UsersMap} from "./src/core/bus/users";
import {CoreBus} from "./src/core/bus";
import Workspace from "./src/common/workspace/workspace.model";
import {
  signUser,
  updateWorkspaces,
  setMessage,
  setOnlineUsers,
  DEFAULT_USER,
  DocumentQueryType,
  DEFAULT_MESSAGE, DEFAULT_USER_DATA, DEFAULT_LIST
} from "./src/common/transformers";
import {PubSubEngine} from "graphql-subscriptions";
import Message from "./src/common/message/message.model";

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

const PubSub: PubSubEngine = CoreBus.pubsub;

const app = express();
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
app.use(session({
  store: new MongoStore({mongooseConnection: mongoose.connection}),
  resave: true,
  saveUninitialized: true,
  secret: config.token.secret
}), cors());
// app.disable('x-powered-by');
// app.use(helmet());

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
      const {document, key, id} = await WSMiddleware(ctx);

      const collection = Workspace.find({}, {});
      const {workspaces} = await updateWorkspaces({ document: null, collection, pubsub: PubSub});

      const {user, code} = (document && key) ? await signUser({document, key, update: true, pubsub: undefined}) : DEFAULT_USER_DATA;
      if(id !== user.id) { return { ...{workspaces}, ...DEFAULT_USER_DATA, ...DEFAULT_LIST, ...DEFAULT_MESSAGE} }

      const {list} = user.email ? await setOnlineUsers({user, map: UsersMap, online: true, pubsub: PubSub}) : DEFAULT_LIST;
      const messageDocument: DocumentQueryType = Message.findOne({}).sort({createdAt: -1});
      const {message} = user.email ? await setMessage({document: messageDocument, user, pubsub: undefined}) : DEFAULT_MESSAGE;

      return {
        user,
        message,
        list,
        workspaces
      };
    },
    onSubscribe: async (ctx, message) => {
      const {document, key} = await WSMiddleware(ctx);
      const {user, code} = await signUser({document, key, online: false, pubsub: undefined});
      if(!code || !user.id) { return; }

      if (message?.payload?.operationName === 'onlineUsers') {
        const {list} = user.email ? await setOnlineUsers({user, map: UsersMap, online: true, pubsub: PubSub}) : { list: [] };
      }
    },
    onNext: async (ctx) => {
      // const {user} = await WSMiddleware(ctx);
      // console.debug('next');
      // TODO: resolve WS Cluster problem through process/worker bus
    },
    onError: async (ctx, message) => {
      // TODO: add acceptable debugger
      console.error('error', message);
    },
    onComplete: async (ctx) => {
      // const {user} = await WSMiddleware(ctx);
      // console.debug('complete');
    }
  },
  wss,
);

server.listen(config.server.ws, () => console.debug(`websocket started on ${config.server.ws}`));

app.use(`/${config.server.path}`, graphqlHTTP(
  async (request, response, graphQLParams) => (
    {
      schema,
      graphiql: true,
      context: ContextMiddleware(request),
      // TODO: Fix 'rule is not function' and revert disable introspection
      // validationRules: [NoIntrospection]
    }
  )
));

app.listen(config.server.port, () => console.debug(`http graphql started on ${config.server.port}`));

// }
