import config from "../../../../../configs/config.app";
import * as jwt from "jsonwebtoken";
import User from "../../../common/user/user.model";

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
  if(!token) { return { user: null }; }
  try {
    const data: any = jwt.verify(token as string, config.token.secret);
    const userDocument: any = await User.findById(data?.id);
    return { user: userDocument.toObject() }
  } catch (e) {
    // throw new AuthenticationError(e);
    console.error(e);
  }
  return { user: null };
}

export {ContextMiddleware, WSMiddleware};
