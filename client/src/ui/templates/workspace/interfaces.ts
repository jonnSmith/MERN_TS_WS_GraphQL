interface IWorkspaceCreateProps {
  onCreate?: (variables: IWorkspaceCreateForm) => void;
}

interface IWorkspaceCreateForm {
  name: string;
  rating: number;
}

export {IWorkspaceCreateProps, IWorkspaceCreateForm};
