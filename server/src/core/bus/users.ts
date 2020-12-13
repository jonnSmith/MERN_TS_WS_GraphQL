import {IOnlineUserData} from "@backchat/core/bus/interfaces";

class UsersMap {

  public static get online() {
    if(!UsersMap.Online) { new UsersMap(); }
    return Array.from(UsersMap.Online, ([email, user]) => (user));
  }

  public static set(user: IOnlineUserData) {
    if(!UsersMap.Online) { new UsersMap(); }
    return UsersMap.Online.set(user.email, user);
    // console.debug(UsersMap.Online);
  }

  public static get(email) {
    if(!UsersMap.Online) { new UsersMap(); }
    return UsersMap.Online.get(email);
    // console.debug(UsersMap.Online);
  }

  public static remove(email) {
    if(!UsersMap.Online) { new UsersMap(); }
    return UsersMap.Online.delete(email);
    // console.debug(UsersMap.Online);
  }

  private static Online: Map<string, IOnlineUserData>;

  private constructor() {
    UsersMap.Online = UsersMap.Online || new Map();
  }

}

export {UsersMap};
