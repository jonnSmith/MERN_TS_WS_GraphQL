const workspaceFields = `{
  id
  name
  rating
}`;

const workspaceQuery = `{
  name
  rating
}`;

const workspaceData = `{
  action
  list ${workspaceFields}
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
  workspaceId
}`;


const messageData = `{
  action
  message ${messageFields}
}`

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
  workspaceQuery,
  workspaceData,
  userFields,
  messageFields,
  messageData,
  onlineUserFields,
  payloadDataType,
  payloadData,
  payloadDataFields,
  onlineUserData
};
