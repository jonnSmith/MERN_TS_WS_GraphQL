import {StateReducers} from "@appchat/core/store/types";
import * as MessageReducers from "@appchat/data/message/reducers";
import * as UserReducers from "@appchat/data/user/reducers";
import { connectRouter } from "connected-react-router";
import {History} from "history";
import {combineReducers} from "redux";

const AllReducers = {...MessageReducers, ...UserReducers};

const rootReducers = (history: History<unknown>) => combineReducers<StateReducers>({
  // @ts-ignore
  ...{router: connectRouter(history)},
  ...AllReducers
});

export {rootReducers, AllReducers};
