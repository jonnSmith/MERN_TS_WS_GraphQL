import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import {
  filterReducer,
  IFilterState,
} from '../reducers/FilterReducer';

export interface IAppState {
  filterState: IFilterState;
}

const rootReducer = combineReducers<IAppState>({
  filterState: filterReducer,
});

export default function configureStore(): Store<IAppState, any> {
  return createStore(rootReducer, undefined, applyMiddleware(thunk));
}