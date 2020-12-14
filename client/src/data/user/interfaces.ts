import {ActionTypes} from "@appchat/data/message/types";
import {IWorkspaceModel} from "@appchat/data/workspace/interfaces";

interface IUserModel {
  id?: string | null;
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  token?: string | null;
  workspace?: IWorkspaceModel;
  workspaceId?: string | null;
}

interface IOnlineUserData {
  email: string | null;
  typing: boolean | null;
}

interface IUserReducer {
  action?: ActionTypes | null;
  user?: IUserModel | null;
  token?: string | null | undefined;
}

interface IOnlineUserListReducer {
  list?: IOnlineUserData[];
  action?: ActionTypes | null;
}

interface IOnlineTogglePanelReducer {
  open?: boolean | null;
  action?: ActionTypes | null;
}

export {IUserModel, IUserReducer, IOnlineUserData, IOnlineUserListReducer, IOnlineTogglePanelReducer};
