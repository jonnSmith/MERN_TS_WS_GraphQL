import {ACTIONS} from "@appchat/core/store/constants";
import {ICommonAction} from "@appchat/core/store/interfaces";
import {userLogin, userLogout} from "@appchat/data/user/actions";
import {put, takeLatest} from "redux-saga/effects";

function* payloadHandled() {
  yield takeLatest([ACTIONS.HANDLE_PAYLOAD], processPayload);
}

function* processPayload(action: ICommonAction) {
  console.debug("payload-saga", action.payload);
  // if (code) {
  //   yield put(code ?
  //     userLogin({user, token: code, action: ACTIONS.USER_LOGIN}) :
  //     userLogout({user, token: code, action: ACTIONS.USER_LOGOUT}
  //     ));
  // }
}

export {payloadHandled};
