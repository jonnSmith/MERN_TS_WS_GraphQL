import express = require('express');
import cors = require('cors');
import {createServer, Server} from "http";
import {makeExecutableSchema} from 'graphql-tools';
import ExecutableSchema from './src/schema';
import config from './../configs/config.app';
import {execute, subscribe} from "graphql";
import {graphqlHTTP} from "express-graphql";
import {ContextMiddleware, WSMiddleware} from "./src/core/midddleware/token";
import { Server as WSS} from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import Message from "./src/common/message/message.model";
import * as jwt from "jsonwebtoken";
import {UsersMap} from "./src/core/bus/users";
import {IOnlineUserData} from "./src/core/bus/interfaces";
import User from "./src/common/user/user.model";
import {ACTIONS, ONLINE_USERS_TRIGGER} from "./src/core/bus/actions";
import {CoreBus} from "./src/core/bus";
import Workspace from "./src/common/workspace/workspace.model";
// import * as moment from "moment";
// import helmet = require('helmet');
// import NoIntrospection from "graphql-disable-introspection"

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
      const { user } = await WSMiddleware(ctx);

      const workspaceData: any[] = await Workspace.find({}, {});
      const workspace: any[] = workspaceData.map(w => w.toObject())

      if(!user) { return { user: null, message: null, list: [], workspace }; }
      const onlineUser: IOnlineUserData = {
        email: user.email,
        typing: false
      }
      UsersMap.set(onlineUser);
      ctx.extra.socket.on("close", async (socket, code, reason) => {
        UsersMap.remove(user.email);
        await PubSub.publish(ONLINE_USERS_TRIGGER, {onlineUsers: { list: UsersMap.online, action: ACTIONS.USER.DISCONNECT}});
      });

      const messageData: any = await Message.findOne({}).sort({createdAt: -1});
      const message = messageData.toObject();
      message.createdAt = new Date(message.createdAt).getTime();
      const authorData: any = await User.findById(message.userId);
      const author = authorData.toObject();

      return {
        user: { ...user, ...{ token: jwt.sign({ id: user.id }, config.token.secret) } },
        message: { ...message, ...{user: author} },
        list: UsersMap.online,
        workspace
      };
    },
    onSubscribe: async (ctx, message) => {
      const { user } = await WSMiddleware(ctx);
      if(!user) { return; }
      if(message?.payload?.operationName === 'onlineUsers') {
        const onlineUser: IOnlineUserData = {
          email: user.email,
          typing: false
        }
        UsersMap.set(onlineUser);
        await PubSub.publish(ONLINE_USERS_TRIGGER, {
          onlineUsers: {
            list: UsersMap.online,
            action: ACTIONS.USER.CONNECT
          }
        });
      }
    },
    onNext: async (ctx) => {
      const { user } = await WSMiddleware(ctx);
      // console.debug('next');
      // TODO: resolve WS Cluster problem through process/worker bus
    },
    onError: async (ctx, message) => {
      // TODO: add acceptable debugger
      console.error('error', message);
    },
    onComplete: async (ctx) => {
      const { user } = await WSMiddleware(ctx);
      // console.debug('complete');
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
      // TODO: Fix 'rule is not function' and revert disable introspection
      // validationRules: [NoIntrospection]
    }
  )
));

app.listen(config.server.port, () => console.debug(`http graphql started on ${config.server.port}`));

// }
