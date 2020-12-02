import {config} from "@appchat/core/config";

const ACTIONS = {...config.client.actions.messages, ...config.client.actions.user};

export { ACTIONS };
