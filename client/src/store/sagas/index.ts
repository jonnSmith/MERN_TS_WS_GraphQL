import { all, fork } from "redux-saga/effects";
import * as UserSagas from "./user";

const rootSaga = function* root() {
    yield all(Object.keys(UserSagas).map( (key) => fork(UserSagas[key])));
};

export {rootSaga};
