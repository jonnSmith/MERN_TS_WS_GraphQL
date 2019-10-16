// Import Reducer type
import { Reducer } from 'redux';
import {
  FilterActions,
  FilterActionTypes,
} from '../actions/FilterActions';

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
  filter: {
    limit: 5,
    skip: 0,
    order: 'desc'
  },
  count: 0
};

export const filterReducer: Reducer<IFilterState, FilterActions> = (
  state = initialFilterState,
  action
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