import {ConfigSettings} from "@appchat/core/config";

const ACTIONS = {
  ...ConfigSettings.client.actions.messages,
  ...ConfigSettings.client.actions.user,
  ...ConfigSettings.client.actions.workspace};

export { ACTIONS };
