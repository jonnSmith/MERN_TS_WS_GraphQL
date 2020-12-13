import {ACTIONS} from "@appchat/core/store/constants";
import {IMessageModel, IMessagesReducer} from "@appchat/data/message/interfaces";

const MessageInitObject: IMessageModel = {
  user: {
    workspace: {
    },
  },
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
    user {
      email
      id
      firstName
      lastName
      workspaceId
      workspace {
        id
        name
        rating
      }
    }
  }`;

export { MessageInitObject, MessagesInitState, MessageFields };
