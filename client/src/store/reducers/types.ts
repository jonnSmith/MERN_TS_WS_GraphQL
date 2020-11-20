import {IUserModel} from "../../gql/queries/user/model";
import * as UserReducers from "./user";

interface IUserReducer {
    user: IUserModel;
}

type StateReducers = typeof UserReducers;
type StateReturnTypes = Record<keyof StateReducers, ReturnType<typeof UserReducers[keyof StateReducers]>>;

export { StateReducers, StateReturnTypes, IUserReducer };
