import {IUserModel} from "@appchat/data/user/interfaces";

const UserInitState: { user: IUserModel } = {
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

export {UserInitState, UserFields};
