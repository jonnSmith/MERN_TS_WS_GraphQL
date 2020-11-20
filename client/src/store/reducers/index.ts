import { combineReducers } from "redux";
import { StateReducers } from "./types";
import * as UserReducers from "./user";

const rootReducers = combineReducers<StateReducers>({...UserReducers});

export {rootReducers};
