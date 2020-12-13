import {User} from "@shared/data/user";
import {IOnlineUserData} from "@backchat/core/bus/interfaces";
import {ACTIONS, ONLINE_USERS_TRIGGER, UPDATE_CHAT_TRIGGER, WORKSPACES_TRIGGER} from "@backchat/core/bus/actions";
import * as jwt from "jsonwebtoken";
import config from "@configs/config.app";
import * as SharedModels from "@shared/models";
import * as SharedTypes from "@shared/types";
import * as SharedConstants from "@shared/constants";

const setWorkspace = async (args) => {
  const {document, object} = args;
  if(!document || !object.email) { return SharedConstants.DEFAULT_USER; }
  const {user} = document ? { user: (await document)?.toObject() } : { user: object };
  if(!user.email) { return SharedConstants.DEFAULT_USER; }
  let userClone = {...user};
  if(!userClone.workspaceId || userClone.workspace.name) {
    return {user: userClone};
  } else {
    const cleanedUser: any = User.findByIdAndUpdate(userClone.id, {workspaceId: null}, {new: true});
    const {user: cleaned} = { user: (await cleanedUser)?.toObject()};
    userClone = cleaned.email ? {...userClone, ...cleaned} : { ...userClone, ...{workspaceId: undefined, workspace: {}} };
  }
  return {user: userClone};
}

const setMessage = async (args: {
  document: SharedTypes.DocumentQueryType,
  user: SharedModels.IUserModel,
  pubsub: SharedTypes.PubSubType}) =>
{
  const {document, user, pubsub} = args;
  if(!document || !user.email) { return SharedConstants.DEFAULT_MESSAGE; }
  const message = (await document)?.toObject();
  const messageClone = {...message};
  if(pubsub && messageClone.id) {
    await pubsub.publish(UPDATE_CHAT_TRIGGER, {
      chatUpdated: {
        message: messageClone,
        action: ACTIONS.MESSAGE.UPDATE
      }
    });
  }
  return {message: messageClone}
}

const queryUser = async ({query}) => {
  const {user} = { user: (await query)?.toObject() };
  if(!user.email || !user.id) { return SharedConstants.DEFAULT_USER; }
  return {user};
}

const setOnlineUsers = async (args) => {
  const {user, map, online, pubsub} = args;
  if (!user.email) {
    return {list: []}
  }
  if (!online && map.get(user.email)) {
    map.remove(user.email)
  }
  if (online && !map.get(user.email)) {
    const onlineUser: IOnlineUserData = {
      email: user.email,
      typing: false
    }
    map.set(onlineUser);
  }
  console.debug('map', map.online);
  if(pubsub) {
    await pubsub.publish(ONLINE_USERS_TRIGGER, {
      onlineUsers: {
        list: map.online,
        action: online ? ACTIONS.USER.CONNECT : ACTIONS.USER.DISCONNECT
      }
    });
  }
  return {list: map.online};
}

const signUser = async (args) => {
  const {document, key, update, password} = args;
  if(!document) { return SharedConstants.DEFAULT_USER_DATA; }
  try {
    const entry = await document;
    if(!entry) { return SharedConstants.DEFAULT_USER_DATA; }
    if(password) {
      const match: boolean = await entry.comparePassword(password);
      if(!match) { return SharedConstants.DEFAULT_USER_DATA; }
    }
    const {user} = { user: entry.toObject() };
    const code = user.id ? (update ? jwt.sign({id: user.id}, config.token.secret) : key) : null;
    return {user, code};
  } catch (e) {
    console.debug(e);
    return {...SharedConstants.DEFAULT_USER_DATA};
  }
}

const updateWorkspaces = async (args) => {
  const {document,collection,pubsub} = args;
  const entry = document ? (await document)?.toObject() : {}
  const entries: SharedModels.IWorkspaceModel[] | undefined = collection ? (await collection)?.map(e => e.toObject()) : [];
  const workspace = {...entry};
  const workspaces = {...entries};
  if(pubsub) {
    await pubsub.publish(WORKSPACES_TRIGGER, {
      workspaceList: {
        list: workspaces,
        action: ACTIONS.WORKSPACE.UPDATE
      }
    });
  }
  return {workspace, workspaces};
}

export {
  setWorkspace,
  setMessage,
  setOnlineUsers,
  signUser,
  updateWorkspaces,
  queryUser,};