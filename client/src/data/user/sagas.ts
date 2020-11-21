import {ApolloConnection} from "core/apollo";
import {config} from "core/config";
import {NavigationPathsSecurity } from "core/navigation/constants";
import {ROUTES} from "core/navigation/enums";
import {ACTIONS} from "core/store/constants";
import {userUpdated} from "data/user/actions";
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
