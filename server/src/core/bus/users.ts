interface IOnlineUserData {
  email: string;
  typing: boolean | null;
}

class Users {

  public get online() {
    if(!Users.Online) { new Users(); }
    return Array.from(Users.Online, ([email, user]) => ({ user }));
  }

  private static Online: Map<string, IOnlineUserData>;

  private constructor() {
    Users.Online = Users.Online || new Map();
  }

  public set(user: IOnlineUserData) {
    if(!Users.Online) { new Users(); }
    Users.Online.set(user.email, user);
  }

  public get(email) {
    if(!Users.Online) { new Users(); }
    Users.Online.get(email);
  }

  public remove(email) {
    if(!Users.Online) { new Users(); }
    Users.Online.delete(email);
  }

}

export { Users };
