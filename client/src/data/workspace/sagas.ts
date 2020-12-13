import {ACTIONS} from "@appchat/core/store/constants";
import {ICommonAction} from "@appchat/core/store/interfaces";
import {workspacesListUpdated} from "@appchat/data/workspace/actions";
import {put, takeLatest} from "redux-saga/effects";

function* workspacesListChanged() {
  yield takeLatest([
      ACTIONS.WORKSPACES_CHANGED,
      ACTIONS.WORKSPACE_ADDED,
      ACTIONS.WORKSPACE_DELETED],
    updateWorkspacesList);
}

function* updateWorkspacesList(action: ICommonAction) {
  // console.debug("workspaces-saga", action);
  const {list} = action.payload;
  yield put(workspacesListUpdated({list, action: ACTIONS.WORKSPACES_UPDATED}));
}

export {workspacesListChanged};
