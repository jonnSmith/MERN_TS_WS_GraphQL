import * as UserSagas from "@appchat/data/user/sagas";
import { all, fork } from "redux-saga/effects";

const rootSaga = function* root() {
    yield all(Object.keys(UserSagas).map( (key) => fork(UserSagas[key])));
};

export {rootSaga};
