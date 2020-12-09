import {IOnlineUserListReducer, IUserReducer} from "@appchat/data/user/interfaces";

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
    }
  }
};

const OnlineUserListInitState: IOnlineUserListReducer = {
  action: null,
  list: [],
};

const UserFields = `{
  id
  email
  firstName
  lastName
  token
  workspace {
    id
    name
  }
}`;

export {UserInitState, OnlineUserListInitState, UserFields};
