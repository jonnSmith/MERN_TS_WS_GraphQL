import { ACTIONS } from "../../../misc/constants/store";
import { ICommonAction } from "../../actions/types";
import { UserInitState } from "../constants";
import { IUserReducer } from "../types";

const UserReducer = (state: IUserReducer = UserInitState, action: ICommonAction): IUserReducer => {
    switch (action.type) {
        case ACTIONS.USER_UPDATED:
            return {...state, ...action.payload};
    }
    return state;
};

export { UserReducer };
