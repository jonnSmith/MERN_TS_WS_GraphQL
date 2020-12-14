import * as MessageSagas from "@appchat/data/message/sagas";
import * as PayloadSagas from "@appchat/data/payload/sagas";
import * as UserSagas from "@appchat/data/user/sagas";
import * as WorkspaceSagas from "@appchat/data/workspace/sagas";
import { all, fork } from "redux-saga/effects";

const AllSagas = {...UserSagas, ...MessageSagas, ...WorkspaceSagas, ...PayloadSagas};

const rootSaga = function* root() {
    yield all(Object.keys(AllSagas).map( (key: keyof typeof AllSagas) => fork(AllSagas[key])));
};

export {rootSaga};
