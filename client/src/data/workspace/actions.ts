import {ACTIONS} from "@appchat/core/store/constants";
import {ICommonAction} from "@appchat/core/store/interfaces";
import {IWorkspaceModel, IWorkspaceReducer} from "@appchat/data/workspace/interfaces";

const workspacesAdded = (data: IWorkspaceModel): ICommonAction => ({
  payload: data,
  type: ACTIONS.WORKSPACE_ADDED,
});

const workspacesDeleted = (data: IWorkspaceModel): ICommonAction => ({
  payload: data,
  type: ACTIONS.MESSAGE_DELETED,
});

const workspacesListUpdated = (data: IWorkspaceReducer): ICommonAction => ({
  payload: data,
  type: ACTIONS.WORKSPACES_UPDATED,
});

export {workspacesListUpdated, workspacesAdded, workspacesDeleted};
