import {User} from "@shared/data/user";
import {ACTIONS, ONLINE_USERS_TRIGGER, UPDATE_CHAT_TRIGGER, WORKSPACES_TRIGGER} from "@backchat/core/bus/actions";
import * as jwt from "jsonwebtoken";
import config from "@configs/config.app";
import * as SharedConstants from "@shared/constants";
import {Message} from "@shared/data/message";
import {Workspace} from "@shared/data/workspace";
import {AuthenticationError} from "apollo-server-errors";

class QueryAdapters {

  private static TOP_MESSAGE: any = Message.findOne({"userId":{$exists:true}}).sort({createdAt: -1});
  private static WORKSPACES_COLLECTION: any = Workspace.find({}, {});

  public static setMessageUser = async(message): Promise<any> => {
    const updated = {...message};
    if(updated?.userId && !updated.user?.email) {
      const author = (await User.findById(message.userId))?.toObject();
      updated.user = {...await QueryAdapters.setUserWorkspace(author)};
    }
    return {...updated};
  }

  public static setUserWorkspace = async(user): Promise<any> => {
    let updated = { ...user};
    if(updated?.workspaceId && !updated.workspace?.name) {
      const workspace = (await Workspace.findById(updated.workspaceId))?.toObject();
      updated.workspace = {...workspace};
      if(!updated.workspace?.name) {
        updated = (await User.findByIdAndUpdate(user.id, {workspaceId: undefined}, {new: true}))?.toObject();
        updated.workspace = undefined;
      }
    }
    return {...updated};
  }

  public static publishOnlineUsers = async (user, map, online, pubsub): Promise<any> => {
    if(!user?.email) { return SharedConstants.DEFAULT_LIST }
    const changed = online ? map.set({ email: user?.email, typing: false }) : map.remove(user?.email);
    console.debug("publishOnlineUsers", changed);
    if(pubsub) {
      await pubsub.publish(ONLINE_USERS_TRIGGER, {
        onlineUsers: {
          list: map.online,
          action: online ? ACTIONS.USER.CONNECT : ACTIONS.USER.DISCONNECT
        }
      });
    }
    return [...map.online];
  }

  public static queryUser = async (document): Promise<any> => {
    try {
      const {...user} = await QueryAdapters.setUserWorkspace( (await document)?.toObject());
      return user;
    } catch (e) {
      return {...SharedConstants.DEFAULT_USER_DATA};
    }
  }

  public static signUser = async (doc, token, refresh, password): Promise<any> => {
    try {
      const document = await doc;
      if(password) {
        const match: boolean = await document.comparePassword(password);
        if(!match) { throw new AuthenticationError('Password mismatch'); }
      }
      const {...user} = await QueryAdapters.setUserWorkspace( await (document)?.toObject());
      user.token = user.id ? (refresh ? jwt.sign({id: user?.id}, config.token.secret) : token) : "";
      return user;
    } catch (e) {
      return {...SharedConstants.DEFAULT_USER_DATA};
    }
  }

  public static publishWorkspaces = async (pubsub): Promise<any> => {
    const workspaces = (await QueryAdapters.WORKSPACES_COLLECTION)?.map((w) => w.toObject()) || [];
    if(pubsub) {
      await pubsub.publish(WORKSPACES_TRIGGER, {
        workspaceList: {
          list: workspaces,
          action: ACTIONS.WORKSPACE.UPDATE
        }
      });
    }
    return workspaces;
  }

  public static publishMessage = async (document, pubsub): Promise<any> => {
    let message = (await document)!.toObject();
    if(message?.userId && !message?.user?.email ) {
      message = QueryAdapters.setMessageUser(message);
    }
    if (pubsub) {
      await pubsub.publish(UPDATE_CHAT_TRIGGER, {
        chatUpdated: {
          ...{message},
          action: ACTIONS.MESSAGE.UPDATE
        }
      });
    }
    return message;
  }

  public static publishTopMessage = async (pubsub): Promise<any> => {
    return QueryAdapters.publishMessage(QueryAdapters.TOP_MESSAGE, pubsub);
  }
}

export { QueryAdapters };
