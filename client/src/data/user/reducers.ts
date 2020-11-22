import {ACTIONS} from "@appchat/core/store/constants";
import {ICommonAction} from "@appchat/core/store/interfaces";
import {UserInitState} from "@appchat/data/user/constants";
import {IUserReducer} from "@appchat/data/user/interfaces";

const UserReducer = (state: IUserReducer = UserInitState, action: ICommonAction): IUserReducer => {
    switch (action.type) {
        case ACTIONS.USER_UPDATED:
            return {...state, ...action.payload};
    }
    return state;
};

export { UserReducer };
