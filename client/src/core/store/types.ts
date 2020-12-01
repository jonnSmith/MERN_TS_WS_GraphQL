import {ACTIONS} from "@appchat/core/store/constants";
import {AllReducers} from "@appchat/core/store/reducers";

type ActionsString = keyof typeof ACTIONS;

type StateReducers = typeof AllReducers;
type StateReturnTypes = Record<keyof typeof AllReducers, any>;

type SupportedStorageEngines = "localStorage" | "sessionStorage";
type StorageEngines = {
    [key in SupportedStorageEngines]: Storage;
};

export { ActionsString, StateReducers, StateReturnTypes, StorageEngines, SupportedStorageEngines };
