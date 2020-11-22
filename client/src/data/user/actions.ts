import {ACTIONS} from "@appchat/core/store/constants";
import {ICommonAction} from "@appchat/core/store/interfaces";
import {UserInitState} from "@appchat/data/user/constants";
import {IUserReducer} from "@appchat/data/user/interfaces";

const userLogin = (data: IUserReducer): ICommonAction => ({
    payload: data,
    type: ACTIONS.USER_LOGIN,
});

const userLogout = (): ICommonAction => ({
    payload: UserInitState,
    type: ACTIONS.USER_LOGOUT,
});

const userUpdated = (data: IUserReducer): ICommonAction => ({
    payload: data,
    type: ACTIONS.USER_UPDATED,
});

export { userLogin, userLogout, userUpdated };
