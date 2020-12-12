import {IOnlineTogglePanelReducer, IOnlineUserListReducer, IUserReducer} from "@appchat/data/user/interfaces";

const UserInitState: IUserReducer = {
  action: null,
  user: {
    email: null,
    firstName: null,
    id: null,
    lastName: null,
    token: null,
    workspace: {
      id: null,
      name: null,
    },
    workspaceId: null,
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
  token
  workspaceId
  workspace {
    id
    name
  }
}`;

export {UserInitState, OnlineUserListInitState, UserFields, OnlineTogglePanelInitState};
