import {ApolloConnection} from "@appchat/core/apollo";
import {ConfigSettings} from "@appchat/core/config";
import {NavigationPathsSecurity} from "@appchat/core/navigation/constants";
import {ROUTES} from "@appchat/core/navigation/enums";
import {ACTIONS} from "@appchat/core/store/constants";
import {ICommonAction} from "@appchat/core/store/interfaces";
import {ClientStorage} from "@appchat/core/store/storage";
import {onlineUserListUpdated, userUpdated} from "@appchat/data/user/actions";
import {push} from "connected-react-router";
import {Pathname} from "history";
import {put, takeLatest} from "redux-saga/effects";

function* userStatusChanged() {
  yield takeLatest([ACTIONS.USER_LOGIN, ACTIONS.USER_LOGOUT], updateUser);
}

function* updateUser(action: ICommonAction) {
  console.debug("user-saga", action);
  const path: Pathname = ApolloConnection.history?.location?.pathname as Pathname;
  const auth = NavigationPathsSecurity[path as keyof typeof ROUTES];
  const {user} = action?.payload;
  ClientStorage.write(ConfigSettings.token.storage, user?.token || "");
  if (action.type === ACTIONS.USER_LOGOUT) {
    ApolloConnection.client.clearStore();
  }
  if (user?.token && !auth) {
    yield put(push(ROUTES.Account));
  }
  if (!user?.token && auth) {
    yield put(push(ROUTES.SignIn));
  }
  yield put(userUpdated({user, action: ACTIONS.USER_UPDATED}));
}

function* onlineUserListChanged() {
  yield takeLatest([ACTIONS.ONLINE_CHANGED], updateOnlineUserList);
}

function* updateOnlineUserList(action: ICommonAction) {
  console.debug("online-user-saga", action);
  const { list } = action.payload;
  yield put(onlineUserListUpdated({list, action: ACTIONS.ONLINE_UPDATED}));
}

function* onlineUserPanelToggled() {
  yield takeLatest([ACTIONS.ONLINE_TOGGLE], toggleOnlineUserList);
}

function* toggleOnlineUserList(action: ICommonAction) {
  console.debug("toggle-user-saga", action);
  const { list } = action.payload;
  yield put(onlineUserListUpdated({list, action: ACTIONS.ONLINE_UPDATED}));
}

export {userStatusChanged, onlineUserListChanged, onlineUserPanelToggled};
