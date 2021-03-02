import {JsonWebTokenError} from "jsonwebtoken";

interface IMessageModel {
  id?: string | null;
  text?: string | null;
  createdAt?: string | number | null;
  userId?: string | null;
  user?: IUserModel;
}

interface IUserModel {
  id?: string | null;
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  token?: string | null;
  workspace?: IWorkspaceModel;
  workspaceId?: string | null;
}

interface IWorkspaceModel {
  id?: string | null;
  name?: string | null;
  rating?: number | null;
}

interface IOnlineUserData {
  email: string | null;
  typing: boolean | null;
}

interface IPayloadData {
  user: IUserModel;
  list: IOnlineUserData[];
  message: IMessageModel;
  code: string | undefined | null;
}

interface IPayloadObject {
  payload: IPayloadData;
}

export {
  IUserModel,
  IWorkspaceModel,
  IMessageModel,
  IPayloadData,
  IOnlineUserData,
  IPayloadObject
};
