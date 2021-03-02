import {ACTIONS} from "@appchat/core/store/constants";
import {ICommonAction} from "@appchat/core/store/interfaces";
import {IPayloadData} from "@shared/models";

const payloadHandler = (payload: IPayloadData): ICommonAction => ({
  payload,
  type: ACTIONS.HANDLE_PAYLOAD
});

const payloadProcessing = (payload: IPayloadData): ICommonAction => ({
  payload,
  type: ACTIONS.PROCESS_PAYLOAD
});

const payloadSending = (payload: IPayloadData): ICommonAction => ({
  payload,
  type: ACTIONS.SEND_PAYLOAD
});
