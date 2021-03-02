import {ACTIONS} from "@appchat/core/store/constants";
import {ICommonAction} from "@appchat/core/store/interfaces";
import {OnlineTogglePanelInitState, OnlineUserListInitState, UserInitState} from "@appchat/data/user/constants";
import {IOnlineTogglePanelReducer, IOnlineUserListReducer, IUserReducer} from "@appchat/data/user/interfaces";

const UserReducer = (state: IUserReducer = UserInitState, action: ICommonAction): IUserReducer => {
    switch (action.type) {
        case ACTIONS.USER_UPDATED:
            return {...state, ...action.payload};
    }
    return state;
};

const OnlineUserListReducer = (
  state: IOnlineUserListReducer = OnlineUserListInitState,
  action: ICommonAction): IOnlineUserListReducer => {
    switch (action.type) {
        case ACTIONS.ONLINE_UPDATED:
            return {...state, ...action.payload};
    }
    return state;
};

const OnlineUserPanelReducer = (
  state: IOnlineTogglePanelReducer = OnlineTogglePanelInitState,
  action: ICommonAction): IOnlineUserListReducer => {
    switch (action.type) {
        case ACTIONS.ONLINE_TOGGLE:
            return {...state, ...action.payload};
        case ACTIONS.ONLINE_OPEN:
            return {...state, ...action.payload};
        case ACTIONS.ONLINE_CLOSE:
            return {...state, ...action.payload};
    }
    return state;
};

export { UserReducer, OnlineUserListReducer, OnlineUserPanelReducer };
