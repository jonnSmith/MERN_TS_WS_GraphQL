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

const payloadDataFields = `{
  user ${userFields}
  list ${onlineUserFields}
  code
  message ${messageFields}
}`;

const payloadDataType = `ResponseData`;

const payloadData = `type ${payloadDataType} {
  user: User
  list: [OnlineUser]
  code: String
  message: Message
}`;

export {
  workspaceFields,
  userFields,
  messageFields,
  onlineUserFields,
  payloadData,
  payloadDataFields,
  payloadDataType
};
