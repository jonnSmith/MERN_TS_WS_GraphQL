import {ACTIONS} from "../../misc/constants/store";

interface ICommonAction {
    type: string;
    payload?: any;
}

type ActionsString = keyof typeof ACTIONS;

export { ICommonAction, ActionsString };
