import {ActionTypes} from "@appchat/data/message/types";
import {IUserModel} from "@appchat/data/user/interfaces";
import {IWorkspaceModel} from "@appchat/data/workspace/interfaces";

interface IMessageModel {
  id: string;
  text: string;
  createdAt: string;
  userId: string;
  workspaceId: string;
  user: IUserModel;
  workspace: IWorkspaceModel;
}

interface IChatAction {
  action: ActionTypes;
  message: IMessageModel;
}

export {IMessageModel, IChatAction};
