import {IUserModel} from "@appchat/data/user/interfaces";

const UserInitState: {user: IUserModel} = { user: null };

const UserFields  = `{
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

export { UserInitState, UserFields };
