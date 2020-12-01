import {ActionTypes} from "@appchat/data/message/types";
import {IUserModel} from "@appchat/data/user/interfaces";
import {IWorkspaceModel} from "@appchat/data/workspace/interfaces";

interface IMessageModel {
  id: string | null;
  text: string | null;
  createdAt?: string | number | null;
  userId?: string | null;
  workspaceId?: string | null;
  user?: IUserModel;
  workspace?: IWorkspaceModel;
}

interface IMessageFilter {
  count: number | null;
  cursor: number | null;
  sort: keyof IMessageModel | null;
  order: string | number | null;
}

interface IMessageReducer {
  action: ActionTypes;
  message: IMessageModel;
}

interface IMessagesReducer {
  action: ActionTypes;
  messages: Map<string, IMessageModel>;
}

export {IMessageModel, IMessageReducer, IMessagesReducer, IMessageFilter};
