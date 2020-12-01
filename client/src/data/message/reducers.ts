import {ACTIONS} from "@appchat/core/store/constants";
import {ICommonAction} from "@appchat/core/store/interfaces";
import {MessageInitState} from "@appchat/data/message/constants";
import {IMessageReducer} from "@appchat/data/message/interfaces";

const MessageReducer = (state: IMessageReducer = MessageInitState, action: ICommonAction): IMessageReducer => {
  switch (action.type) {
    case ACTIONS.MESSAGES_UPDATED:
      return {...state, ...action.payload};
  }
  return state;
};

export { MessageReducer };