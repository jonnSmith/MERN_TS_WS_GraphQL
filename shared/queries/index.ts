const workspaceFields = `{
  id
  name
  rating
}`;

const userFields = `{
  id
  email
  firstName
  lastName
  workspaceId
  workspace ${workspaceFields}
}`;

const messageFields = `{
  id
  text
  createdAt
  userId
  user ${userFields}
}`;

const onlineUserFields = `{
  email
  typing
}`;

const onlineUserData = `{
  action
  list ${onlineUserFields}
}`;

const payloadDataFields = `{
  user ${userFields}
  list ${onlineUserFields}
  token
  message ${messageFields}
  workspaces ${workspaceFields}
}`;

const payloadDataType = `ResponseData`;

const payloadData = `type ${payloadDataType} {
  user: User
  list: [OnlineUser]
  token: String
  message: Message
  workspaces: [Workspace]
}`;

export {
  workspaceFields,
  userFields,
  messageFields,
  onlineUserFields,
  payloadData,
  payloadDataFields,
  payloadDataType,
  onlineUserData
};
