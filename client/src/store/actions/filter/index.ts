import { useQuery } from "react-apollo-hooks";
import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { MESSAGES_COUNT } from "../../../queries/message";

// Import Filter Typing
import { IFilter, IFilterState } from "../../reducers/filter";

// Create Action Constants
export enum FilterActionTypes {
  SET_COUNT = "SET_COUNT",
  SET_FILTER = "SET_FILTER",
}

// Interface for Get All Action Type
export interface ICountAction {
  type: FilterActionTypes.SET_COUNT;
  count: number;
}

export interface IFilterAction {
  type: FilterActionTypes.SET_FILTER;
  filter: IFilter;
}

export type FilterActions = IFilterAction | ICountAction;

const setCount = (count) => {
  return { type: FilterActionTypes.SET_COUNT, count };
};

const setFilter = (filter) => {
  return { type: FilterActionTypes.SET_FILTER, filter };
};

export const filterActions = {
  setCount,
  setFilter,
};
