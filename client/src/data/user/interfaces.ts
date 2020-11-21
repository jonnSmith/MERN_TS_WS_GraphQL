import {IWorkspaceModel} from "data/workspace/interfaces";

interface IUserModel {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    token: string;
    workspace: IWorkspaceModel;
}

interface IUserReducer {
    user: IUserModel;
}

export { IUserModel, IUserReducer };
