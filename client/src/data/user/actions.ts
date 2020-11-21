import {ACTIONS} from "core/store/constants";
import {ICommonAction} from "core/store/interfaces";
import {UserInitState} from "data/user/constants";
import {IUserReducer} from "data/user/interfaces";

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
