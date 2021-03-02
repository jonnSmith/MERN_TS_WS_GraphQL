import {ActionTypes} from "@appchat/data/message/types";
import {IUserModel} from "@appchat/data/user/interfaces";

interface IMessageModel {
  id?: string | null;
  text?: string | null;
  createdAt?: string | number | null;
  userId?: string | null;
  user?: IUserModel;
}

interface IMessageFilter {
  count: number | null;
  cursor: number | null;
  sort: keyof IMessageModel | null;
  order: string | number | null;
}

interface IMessageReducer {
  message?: IMessageModel;
}

interface IMessagesReducer {
  action: ActionTypes;
  message: IMessageModel;
}

export {IMessageModel, IMessageReducer, IMessagesReducer, IMessageFilter};
