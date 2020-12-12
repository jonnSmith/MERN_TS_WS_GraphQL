interface IWorkspaceCreateForm {
  name: string;
  rating: number;
}

interface IWorkspaceCreateProps {
  onCreate?: (variables: IWorkspaceCreateForm) => void;
}

export {IWorkspaceCreateForm, IWorkspaceCreateProps};
