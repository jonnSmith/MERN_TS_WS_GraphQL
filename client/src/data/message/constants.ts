import {ACTIONS} from "@appchat/core/store/constants";
import {IMessageModel, IMessagesReducer} from "@appchat/data/message/interfaces";
import {Map} from "typescript";

const MessageInitObject: IMessageModel = {
  createdAt: null,
  id: null,
  text: null,
  user: {
    email: "Loading...",
    id: null,
  },
  userId: null,
  workspace: {
    id: null,
    name: null,
  },
  workspaceId: null,
};

const MessagesInitState: IMessagesReducer = {
  action: ACTIONS.MESSAGE_PRELOADED,
  message: MessageInitObject
};

const MessageFields = `
  {
    id
    text
    createdAt
    userId
    workspaceId
    user {
      email
      id
      firstName
      lastName
    }
  }`;

export { MessageInitObject, MessagesInitState, MessageFields };
