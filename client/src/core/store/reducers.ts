import {StateReducers} from "@appchat/core/store/types";
import * as MessageReducers from "@appchat/data/message/reducers";
import * as UserReducers from "@appchat/data/user/reducers";
import {combineReducers} from "redux";

const AllReducers = {...MessageReducers, ...UserReducers};

const rootReducers = combineReducers<StateReducers>({
  ...AllReducers
});

export {rootReducers, AllReducers};
