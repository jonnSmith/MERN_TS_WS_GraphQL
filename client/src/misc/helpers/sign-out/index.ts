import config from "../../../../../configs/config.app";
import { ApolloConnection } from "../../../gql/client";
import { ROUTES } from "../../enums/routes";

const signOut = (client) => {
  localStorage.removeItem(config.token.storage);
  client.resetStore();
  ApolloConnection.history.push(ROUTES.SignIn);
};

export { signOut };
