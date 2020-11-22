import {StateReducers} from "@appchat/core/store/types";
import * as UserReducers from "@appchat/data/user/reducers";
import {combineReducers} from "redux";

const rootReducers = combineReducers<StateReducers>({...UserReducers});

export {rootReducers};
