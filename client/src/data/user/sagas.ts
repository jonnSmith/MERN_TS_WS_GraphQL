import {ApolloConnection} from "@appchat/core/apollo";
import {config} from "@appchat/core/config";
import {NavigationPathsSecurity } from "@appchat/core/navigation/constants";
import {ROUTES} from "@appchat/core/navigation/enums";
import {ACTIONS} from "@appchat/core/store/constants";
import {userUpdated} from "@appchat/data/user/actions";
import {put, takeLatest} from "redux-saga/effects";

function* userStatusChanged() {
    yield takeLatest([ACTIONS.USER_LOGIN, ACTIONS.USER_LOGOUT], updateUser);
}

function* updateUser(action) {
    const path = ApolloConnection.history?.location?.pathname;
    const auth = NavigationPathsSecurity[path];
    const {user} = action?.payload;
    localStorage.setItem(config.token.storage, user?.token || "");
    if (action.type === ACTIONS.USER_LOGOUT) {
        ApolloConnection.client.clearStore();
    }
    if (user?.token && !auth) { ApolloConnection.history.replace(ROUTES.Account); }
    if (!user?.token && auth) { ApolloConnection.history.replace(ROUTES.SignIn); }
    yield put(userUpdated(action.payload));
}

export { userStatusChanged };
