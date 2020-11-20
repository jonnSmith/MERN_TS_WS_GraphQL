import {IUserModel} from "../../../gql/queries/user/model";
import { ACTIONS } from "../../../misc/constants/store";
import { ICommonAction } from "../../../misc/interfaces/store";

const userLogin = (user: IUserModel): ICommonAction => ({
    payload: user,
    type: ACTIONS.USER_LOGIN,
});

const userLogout = (): ICommonAction => ({
    payload: null,
    type: ACTIONS.USER_LOGOUT,
});

const userUpdated = (user: IUserModel | null): ICommonAction => ({
    payload: user,
    type: ACTIONS.USER_UPDATED,
});

export { userLogin, userLogout, userUpdated };
