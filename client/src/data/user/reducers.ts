import {ACTIONS} from "core/store/constants";
import {ICommonAction} from "core/store/interfaces";
import {UserInitState} from "data/user/constants";
import {IUserReducer} from "data/user/interfaces";

const UserReducer = (state: IUserReducer = UserInitState, action: ICommonAction): IUserReducer => {
    switch (action.type) {
        case ACTIONS.USER_UPDATED:
            return {...state, ...action.payload};
    }
    return state;
};

export { UserReducer };
