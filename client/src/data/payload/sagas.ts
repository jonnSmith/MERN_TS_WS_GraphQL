import {ACTIONS} from "@appchat/core/store/constants";
import {ICommonAction} from "@appchat/core/store/interfaces";
import {MessageUpdated} from "@appchat/data/message/actions";
import {onlineUserListUpdated, userLogin, userLogout} from "@appchat/data/user/actions";
import {workspacesListChanged} from "@appchat/data/workspace/actions";
import {put, takeLatest} from "redux-saga/effects";

function* payloadHandled() {
  yield takeLatest([ACTIONS.HANDLE_PAYLOAD], processPayload);
}

function* processPayload(action: ICommonAction) {
  console.debug("payload-saga", action.payload);
  const {user, message, list, workspaces, token} = action.payload;
  yield put(workspacesListChanged({list: workspaces}));
  yield put(token ?
    userLogin({user, token, action: ACTIONS.USER_LOGIN}) :
    userLogout({user, token, action: ACTIONS.USER_LOGOUT}
    ));
  yield put(MessageUpdated({message}));
  yield put(onlineUserListUpdated({list}));
}

export {payloadHandled};
