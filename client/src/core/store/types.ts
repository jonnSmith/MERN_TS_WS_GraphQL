import {ACTIONS} from "@appchat/core/store/constants";
import * as UserReducers from "@appchat/data/user/reducers";

type ActionsString = keyof typeof ACTIONS;

type StateReducers = typeof UserReducers;
type StateReturnTypes = Record<keyof StateReducers, ReturnType<typeof UserReducers[keyof StateReducers]>>;

type SupportedStorageEngines = "localStorage" | "sessionStorage";
type StorageEngines = {
    [key in SupportedStorageEngines]: Storage;
};

export { ActionsString, StateReducers, StateReturnTypes, StorageEngines, SupportedStorageEngines };
