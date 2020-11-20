import { ACTIONS } from "../../../misc/constants/store";
import {UserInitState} from "../../reducers/constants";
import {IUserReducer} from "../../reducers/types";
import { ICommonAction } from "../types";

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
