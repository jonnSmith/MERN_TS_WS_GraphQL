// Import Reducer type
import { Reducer } from "redux";
import { FilterActions, FilterActionTypes } from "../../actions/filter";

// Define the Filter type
export interface IFilter {
  limit: number;
  skip: number;
  order: string;
}

// Define the Filter State
export interface IFilterState {
  filter: IFilter;
  count: number;
}

// Define the initial state
const initialFilterState: IFilterState = {
  count: 0,
  filter: {
    limit: 5,
    order: "desc",
    skip: 0,
  },
};

export const filterReducer: Reducer<IFilterState, FilterActions> = (
  state = initialFilterState,
  action,
) => {
  switch (action.type) {
    case FilterActionTypes.SET_COUNT: {
      return {
        ...state,
        count: action.count,
      };
    }
    case FilterActionTypes.SET_FILTER: {
      return {
        ...state,
        filter: action.filter,
      };
    }
    default:
      return state;
  }
};
