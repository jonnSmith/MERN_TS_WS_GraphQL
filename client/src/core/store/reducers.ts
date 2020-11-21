import {StateReducers} from "core/store/types";
import * as UserReducers from "data/user/reducers";
import {combineReducers} from "redux";

const rootReducers = combineReducers<StateReducers>({...UserReducers});

export {rootReducers};
