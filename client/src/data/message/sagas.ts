import {ACTIONS} from "@appchat/core/store/constants";
import {ICommonAction} from "@appchat/core/store/interfaces";
import {MessagesUpdated} from "@appchat/data/message/actions";
import {put, takeLatest} from "redux-saga/effects";

function* messagesChanged() {
  yield takeLatest([
    ACTIONS.MESSAGE_UPDATED,
    ACTIONS.MESSAGE_DELETED,
    ACTIONS.MESSAGE_ADDED,
    ACTIONS.MESSAGE_PRELOADED], updateMessages);
}

function* updateMessages(action: ICommonAction) {
  const {message} = action?.payload;
  const data = {
    action: ACTIONS.MESSAGES_UPDATED,
    message,
  };
  yield put(MessagesUpdated(data));
}

export {messagesChanged};
