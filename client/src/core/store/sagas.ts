import * as MessageSagas from "@appchat/data/message/sagas";
import * as UserSagas from "@appchat/data/user/sagas";
import { all, fork } from "redux-saga/effects";

const AllSagas = {...UserSagas, ...MessageSagas};

const rootSaga = function* root() {
    yield all(Object.keys(AllSagas).map( (key: keyof typeof AllSagas) => fork(AllSagas[key])));
};

export {rootSaga};
