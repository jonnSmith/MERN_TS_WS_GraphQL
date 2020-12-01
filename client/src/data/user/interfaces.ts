import {IWorkspaceModel} from "@appchat/data/workspace/interfaces";

interface IUserModel {
    id: string | null;
    email: string | null;
    firstName?: string | null;
    lastName?: string | null;
    token?: string | null;
    workspace?: IWorkspaceModel;
}

interface IUserReducer {
    user: IUserModel;
}

export { IUserModel, IUserReducer };
