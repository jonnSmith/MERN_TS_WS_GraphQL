import {
  IOnlineTogglePanelReducer,
  IOnlineUserListReducer,
  IUserModel,
  IUserReducer
} from "@appchat/data/user/interfaces";

const UserInitObject: IUserModel = {
  token: null,
  workspace: {}
};

const UserInitState: IUserReducer = {
  action: null,
  user: UserInitObject
};

const UserEmptyHolder: any = {
  payload: {
    code: undefined,
    list: [],
    message: {
      user: {
        workspace: {}
      }
    },
    user: {
      email: undefined,
      workspace: {}
    },
  }

};

const OnlineUserListInitState: IOnlineUserListReducer = {
  action: null,
  list: [],
};

const OnlineTogglePanelInitState: IOnlineTogglePanelReducer = {
  action: null,
  open: false,
};

const UserFields = `{
  id
  email
  firstName
  lastName
  workspaceId
  workspace {
    id
    name
    rating
  }
}`;

export {
  UserInitState,
  UserInitObject,
  UserEmptyHolder,
  OnlineUserListInitState,
  UserFields,
  OnlineTogglePanelInitState
};
