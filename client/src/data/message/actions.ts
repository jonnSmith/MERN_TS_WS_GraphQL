import {ACTIONS} from "@appchat/core/store/constants";
import {ICommonAction} from "@appchat/core/store/interfaces";
import {IMessageReducer, IMessagesReducer} from "@appchat/data/message/interfaces";

const MessageAdded = (data: IMessageReducer): ICommonAction => ({
  payload: data,
  type: ACTIONS.MESSAGE_ADDED
});

const MessageDeleted = (data: IMessageReducer): ICommonAction => ({
  payload: data,
  type: ACTIONS.MESSAGE_DELETED
});

const MessageUpdated = (data: IMessageReducer): ICommonAction => ({
  payload: data,
  type: ACTIONS.MESSAGE_UPDATED
});

const MessagesUpdated = (data: IMessagesReducer): ICommonAction => ({
  payload: data,
  type: ACTIONS.MESSAGES_UPDATED
});

export {MessageAdded, MessageUpdated, MessageDeleted, MessagesUpdated};
