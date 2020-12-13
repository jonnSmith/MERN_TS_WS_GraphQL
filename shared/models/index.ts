interface IMessageModel {
  id?: string | null;
  text?: string | null;
  createdAt?: string | number | null;
  userId?: string | null;
  user?: IUserModel;
}

interface IUserModel {
  id?: string | null;
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  token?: string | null;
  workspace?: IWorkspaceModel;
  workspaceId?: string | null;
}

interface IWorkspaceModel {
  id?: string | null;
  name?: string | null;
  rating?: number | null;
}

export {IUserModel, IWorkspaceModel, IMessageModel}
