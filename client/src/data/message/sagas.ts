import {ACTIONS} from "@appchat/core/store/constants";
import {ICommonAction} from "@appchat/core/store/interfaces";
import {MessagesUpdated} from "@appchat/data/message/actions";
import {put, takeLatest} from "redux-saga/effects";
import {Map} from "typescript";

function* messagesChanged() {
  yield takeLatest([ACTIONS.MESSAGE_UPDATED, ACTIONS.MESSAGE_DELETED, ACTIONS.MESSAGE_ADDED], updateMessages);
}

function* updateMessages(action: ICommonAction) {
  console.debug("message-saga", action);
  const {message} = action?.payload;
  const messages = new Map();
  messages.set(message.id, message);
  const data = {
    action: ACTIONS.MESSAGES_UPDATED,
    message,
  };
  yield put(MessagesUpdated(data));
}

export {messagesChanged};
