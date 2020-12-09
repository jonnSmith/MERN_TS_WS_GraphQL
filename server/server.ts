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
import {Users} from "./src/core/bus/users";
import User from "./src/common/user/user.model";

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

interface IOnlineUser {
  email: string;
  typing: boolean;
}
let onlineUsers: IOnlineUser[]  = [];

useServer(
  {
    schema,
    execute,
    subscribe,
    onConnect: async (ctx) => {
      const { user } = await WSMiddleware(ctx);
      ctx.extra.socket.on("close", async (socket, code, reason) => {
        onlineUsers = user ? onlineUsers.filter( (u: IOnlineUser) => u.email !== user.email) : onlineUsers;
        console.debug('close', onlineUsers)
      });
      const message: any = await Message.findOne({}).sort({createdAt: -1});
      const author = await User.findById(message.userId);
      return user ? { user: { ...user, ...{ token: jwt.sign({ id: user.id }, config.token.secret) } }, message: { ...message.toObject(), ...{user: author} } } : { user: null, message: null };
    },
    onSubscribe: async (ctx, message) => {
      const { user } = await WSMiddleware(ctx);
      // if(message?.payload?.operationName === 'onlineUsers') {
      //   if (user && (!onlineUsers.length || !onlineUsers.some((u: IOnlineUser) => u?.email === user.email))) {
      //     const onlineUser: IOnlineUser = {
      //       email: user.email,
      //       typing: false
      //     }
      //     onlineUsers.push(onlineUser) ;
      //   }
      //   console.debug('online', onlineUsers);
      // }
      // if(message?.payload?.operationName === 'chatUpdated') {
      //   const update: any = await Message.findOne({}).sort({createdAt: -1});
      //   console.debug('update', update);
      // }
      // TODO: add additional logic checking
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
    }
  )
));

app.listen(config.server.port, () => console.debug(`http graphql started on ${config.server.port}`));

// }
