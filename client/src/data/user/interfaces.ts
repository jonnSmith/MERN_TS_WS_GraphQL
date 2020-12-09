import {IWorkspaceModel} from "@appchat/data/workspace/interfaces";
import {ActionTypes} from "@appchat/data/message/types";

interface IUserModel {
  id: string | null;
  email: string | null;
  firstName?: string | null;
  lastName?: string | null;
  token?: string | null;
  workspace?: IWorkspaceModel;
}

interface IOnlineUserData {
  email: string | null;
  typing: boolean | null;
}

interface IUserReducer {
  action?: ActionTypes | null;
  user?: IUserModel | null;
}

interface IOnlineUserListReducer {
  list?: IOnlineUserData[];
  action?: ActionTypes | null;
}

export {IUserModel, IUserReducer, IOnlineUserData, IOnlineUserListReducer};
