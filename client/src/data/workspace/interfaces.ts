import {ActionTypes} from "@appchat/data/message/types";

interface IWorkspaceModel {
  id?: string | null;
  name?: string | null;
  rating?: number | null;
}

interface IWorkspaceReducer {
  list?: IWorkspaceModel[];
  action?: ActionTypes | null;
}

export {IWorkspaceModel, IWorkspaceReducer};
