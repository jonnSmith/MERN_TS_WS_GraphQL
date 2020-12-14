import config from "@configs/config.app";
import * as jwt from "jsonwebtoken";

const ContextMiddleware = async (req) => {
  return GetUserByToken(GetHeadersToken(req));
};

const WSMiddleware = async (ctx) => {
  return GetUserByToken(GetHeadersToken(ctx.connectionParams));
}

const GetHeadersToken = (request) => {
  const {[config.token.header]: token} = request?.headers;
  return token || "";
}

const GetUserByToken = async (token) => {
  try {
    const check: any = token ? await jwt.verify(token as string, config.token.secret) : null;
    const id = check?.id || null;
    return { token, id }
  } catch (e) {
    console.debug(e);
    return { token: "", id: null };
  }
}

export {ContextMiddleware, WSMiddleware};
