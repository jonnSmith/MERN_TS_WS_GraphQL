import config from "../../../../configs/config.app";
import { ROUTES } from "../../constants/routes";
import { createHistory } from "../history";

const signOut = (client) => {
  localStorage.removeItem(config.token.storage);
  client.resetStore();
  createHistory.push(ROUTES.SIGN_IN);
};

export { signOut };