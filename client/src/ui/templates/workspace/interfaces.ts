import {IWorkspaceModel} from "@appchat/data/workspace/interfaces";

interface IWorkspaceCreateForm {
  name?: string;
  rating?: string;
}

interface IRemoveWorkspace {
  id: string;
}

interface ICreateWorkspace {
  input: IWorkspaceCreateForm;
}

interface IWorkspaceCreateProps {
  onCreate?: (variables: ICreateWorkspace) => Promise<any>;
}

interface IWorkpacesProps {
  list?: IWorkspaceModel[];
  onDelete?: (variables: IRemoveWorkspace) => Promise<any>;
}

export {IWorkspaceCreateForm, IWorkspaceCreateProps, IRemoveWorkspace, ICreateWorkspace, IWorkpacesProps};
