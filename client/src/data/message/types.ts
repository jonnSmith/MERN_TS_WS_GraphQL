import {ConfigSettings} from "@appchat/core/config";

const { messages } = ConfigSettings.client.actions;
type ActionTypes = keyof typeof messages | string;

export {ActionTypes};
