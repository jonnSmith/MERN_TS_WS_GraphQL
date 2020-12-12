import {ACTIONS} from "@appchat/core/store/constants";
import {ICommonAction} from "@appchat/core/store/interfaces";
import {WorkspacesListInitState} from "@appchat/data/workspace/constants";
import {IWorkspaceReducer} from "@appchat/data/workspace/interfaces";

const WorkspaceReducer = (
  state: IWorkspaceReducer = WorkspacesListInitState,
  action: ICommonAction): IWorkspaceReducer => {
  switch (action.type) {
    case ACTIONS.WORKSPACE_ADDED:
      return {...state, ...action.payload};
    case ACTIONS.WORKSPACE_DELETED:
      return {...state, ...action.payload};
    case ACTIONS.WORKSPACES_CHANGED:
      return {...state, ...action.payload};
    case ACTIONS.WORKSPACES_UPDATED:
      return {...state, ...action.payload};
  }
  return state;
};

export {WorkspaceReducer};
