import {ACTIONS} from "@appchat/core/store/constants";
import {ICommonAction} from "@appchat/core/store/interfaces";
import {OnlineUserListInitState, UserInitState} from "@appchat/data/user/constants";
import {IOnlineUserListReducer, IUserReducer} from "@appchat/data/user/interfaces";

const UserReducer = (state: IUserReducer = UserInitState, action: ICommonAction): IUserReducer => {
    switch (action.type) {
        case ACTIONS.USER_LOGIN:
            return {...state, ...action.payload};
        case ACTIONS.USER_LOGOUT:
            return {...state, ...action.payload};
        case ACTIONS.USER_UPDATED:
            return {...state, ...action.payload};
    }
    return state;
};

const OnlineUserListReducer = (
  state: IOnlineUserListReducer = OnlineUserListInitState,
  action: ICommonAction): IOnlineUserListReducer => {
    switch (action.type) {
        case ACTIONS.ONLINE_CHANGED:
            return {...state, ...action.payload};
        case ACTIONS.ONLINE_UPDATED:
            return {...state, ...action.payload};
    }
    return state;
};

export { UserReducer, OnlineUserListReducer };
