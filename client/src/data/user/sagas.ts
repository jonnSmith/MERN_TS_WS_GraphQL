import {ApolloConnection} from "@appchat/core/apollo";
import {config} from "@appchat/core/config";
import {NavigationPathsSecurity } from "@appchat/core/navigation/constants";
import {ROUTES} from "@appchat/core/navigation/enums";
import {ACTIONS} from "@appchat/core/store/constants";
import {ICommonAction} from "@appchat/core/store/interfaces";
import {ClientStorage} from "@appchat/core/store/storage";
import {userUpdated} from "@appchat/data/user/actions";
import {Pathname} from "history";
import {put, takeLatest} from "redux-saga/effects";

function* userStatusChanged() {
    yield takeLatest([ACTIONS.USER_LOGIN, ACTIONS.USER_LOGOUT], updateUser);
}

function* updateUser(action: ICommonAction) {
    const path: Pathname = ApolloConnection.history?.location?.pathname as Pathname;
    const auth = NavigationPathsSecurity[path as keyof typeof ROUTES];
    const {user} = action?.payload;
    ClientStorage.write(config.token.storage, user?.token || "");
    if (action.type === ACTIONS.USER_LOGOUT) {
        ApolloConnection.client.clearStore();
    }
    if (user?.token && !auth) { ApolloConnection.history.replace(ROUTES.Account); }
    if (!user?.token && auth) { ApolloConnection.history.replace(ROUTES.SignIn); }
    yield put(userUpdated(action.payload));
}

export { userStatusChanged };
