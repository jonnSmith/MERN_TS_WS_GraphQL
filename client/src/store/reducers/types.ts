import * as UserReducers from "./user";

type StateReducers = typeof UserReducers;
type StateReturnTypes = Record<keyof StateReducers, ReturnType<typeof UserReducers[keyof StateReducers]>>;

export { StateReducers, StateReturnTypes };
