import config from "@configs/config.app";
import * as jwt from "jsonwebtoken";
import {User} from "@shared/data/user";
import {ID} from "graphql-ws";

const ContextMiddleware = async (req) => {
  return GetUserByToken(GetHeadersToken(req));
};

const WSMiddleware = async (ctx) => {
  return GetUserByToken(GetHeadersToken(ctx.connectionParams));
}

const GetHeadersToken = (request) => {
  const {[config.token.header]: token} = request?.headers;
  return token || null;
}

const GetUserByToken = async (token) => {
  try {
    const {id}: any = token ? await jwt.verify(token as string, config.token.secret) : { id: null };
    const document = id ? User.findById(id as ID) : null;
    const key = document ? token : null;
    return {document, key, id}
  } catch (e) {
    console.debug(e);
    return { document: null, key: null, id: null };
  }
}

export {ContextMiddleware, WSMiddleware};
