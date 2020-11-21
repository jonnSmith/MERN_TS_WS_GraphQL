const UserInitState = { user: null };

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
