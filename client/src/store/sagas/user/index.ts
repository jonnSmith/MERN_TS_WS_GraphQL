import { put, takeLatest } from "redux-saga/effects";
import config from "../../../../../configs/config.app";
import { ApolloConnection } from "../../../gql/client";
import { NavigationPathsSecurity } from "../../../misc/constants/navigation";
import { ACTIONS } from "../../../misc/constants/store";
import { ROUTES } from "../../../misc/enums/routes";
import { userUpdated } from "../../actions/user";

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
