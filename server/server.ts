import {PayloadEmptyHolder} from "../client/src/data/user/constants";

const tSModuleAlias = require("@momothepug/tsmodule-alias");
const aliasRegister = tSModuleAlias.use({
  "@backchat": __dirname + "/src/",
  "@shared": __dirname + "./../shared",
  "@configs": __dirname + "/../configs"
});

import express = require("express");
import cors = require("cors");
import {createServer, Server} from "http";
import {makeExecutableSchema} from "graphql-tools";
import {ExecutableSchema} from "@backchat/common/schema";
import config from "@configs/config.app";
import {execute, subscribe} from "graphql";
import {graphqlHTTP} from "express-graphql";
import {ContextMiddleware, WSMiddleware} from "@backchat/core/midddleware/token";
import {Server as WSS} from "ws";
import {useServer} from "graphql-ws/lib/use/ws";
import {UsersMap} from "@backchat/core/bus/users";
import {CoreBus} from "@backchat/core/bus";
import {
  signUser, publishWorkspaces, publishOnlineUsers, publishTopMessage,
} from "@backchat/core/adapters";
import {PubSubEngine} from "graphql-subscriptions";
import {User} from "../shared/data/user";
import {ID} from "graphql-ws";

const schema = makeExecutableSchema(ExecutableSchema);
const mongoose = require("mongoose");
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
// const cluster = require("cluster");
// const numCPUs = require("os").cpus().length;
// if (cluster.isMaster) {
//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }
//   cluster.on("exit", (worker, code, signal) => {
//     console.log(`worker ${worker.process.pid} died`);
//   });
// } else {

const pubsub: PubSubEngine = CoreBus.pubsub;

const app = express();
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
app.use(session({
  store: new MongoStore({mongooseConnection: mongoose.connection}),
  resave: true,
  saveUninitialized: true,
  secret: config.token.secret
}), cors());
// app.disable("x-powered-by");
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
    schema, execute, subscribe, onConnect: async (ctx) => {
      const holder = new Map(); const payload = {};
      const verified: {token, id} = await WSMiddleware(ctx);
      console.debug('verified', verified);
      if(verified.token) {
        const user = await signUser(User.findById(verified?.id as ID), verified?.token, false, null);
        console.debug('user', user);
        if(user?.email && user?.token) {
          const clone = {...user};
          holder.set('token', clone?.token);
          clone.token = undefined;
          holder.set('user', clone)
            .set("message", await publishTopMessage(clone, null))
            .set("list", await publishOnlineUsers(clone, UsersMap, true, pubsub))
        }
      }
      holder.set("workspaces", await publishWorkspaces(null))
        .forEach(function(value, key) { payload[key] = value });
      holder.clear();
      return payload;
    },
    // TODO: Socket middlewares
    onSubscribe: async (ctx, message) => {
      // TODO: add only light and cheep middleware - many calls on load and after
    },
    onNext: async (ctx) => {
      // TODO: middleware for every socket operation
    },
    onError: async (ctx, message) => {
      // TODO: catch and process errors middleware
      console.error("error", message);
    },
    onComplete: async (ctx) => {
      // const {user} = await WSMiddleware(ctx);
      // console.debug("complete");
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
      // TODO: Fix "rule is not function" and revert disable introspection
      // validationRules: [NoIntrospection]
    }
  )
));

app.listen(config.server.port, () => console.debug(`http graphql started on ${config.server.port}`));

// }
