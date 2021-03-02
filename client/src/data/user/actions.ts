import {ACTIONS} from "@appchat/core/store/constants";
import {ICommonAction} from "@appchat/core/store/interfaces";
import {IOnlineTogglePanelReducer, IOnlineUserListReducer, IUserReducer} from "@appchat/data/user/interfaces";

const userLogin = (data: IUserReducer): ICommonAction => ({
    payload: data,
    type: ACTIONS.USER_LOGIN,
});

const userLogout = (data: IUserReducer): ICommonAction => ({
    payload: data,
    type: ACTIONS.USER_LOGOUT,
});

const userUpdated = (data: IUserReducer): ICommonAction => ({
    payload: data,
    type: ACTIONS.USER_UPDATED,
});

const onlineUserListUpdated = (data: IOnlineUserListReducer): ICommonAction => ({
    payload: data,
    type: ACTIONS.ONLINE_UPDATED,
});

const toggleOnlineUserPanel = (data: IOnlineTogglePanelReducer): ICommonAction => ({
    payload: data,
    type: ACTIONS.ONLINE_OPEN,
});

export { userLogin, userLogout, userUpdated, onlineUserListUpdated, toggleOnlineUserPanel };
