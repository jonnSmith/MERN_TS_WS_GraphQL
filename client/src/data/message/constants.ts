import {IMessageModel, IMessageReducer} from "@appchat/data/message/interfaces";

const MessageInitObject: IMessageModel = {
  createdAt: null,
  id: null,
  text: null,
  user: {
    email: "Loading...",
    id: null,
  },
  userId: null,
  workspace: {
    id: null,
    name: null,
  },
  workspaceId: null,
};

const MessageInitState: IMessageReducer = {
  action: null,
  message: MessageInitObject,
};

const MessageFields = `
  {
    id
    text
    createdAt
    userId
    workspaceId
    user {
      email
    }
  }`;

export { MessageInitObject, MessageInitState, MessageFields };
