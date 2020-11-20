import {IUserModel} from "../../../gql/queries/user/model";
import { ACTIONS } from "../../../misc/constants/store";
import { ICommonAction } from "../../../misc/interfaces/store";

const UserReducer = (state: IUserModel | null = null, action: ICommonAction): IUserModel | null => {
    switch (action.type) {
        case ACTIONS.USER_UPDATED:
            return {...state, ...action.payload};
    }
    return state;
};

export { UserReducer };
