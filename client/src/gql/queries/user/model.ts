interface IWorkspaceModel {
    id: string;
    name: string;
}

interface IUserModel {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  token: string;
  workspace: IWorkspaceModel;
}

export { IUserModel, IWorkspaceModel };
