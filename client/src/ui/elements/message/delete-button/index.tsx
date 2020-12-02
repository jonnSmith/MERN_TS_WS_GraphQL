import {useMutation} from "@apollo/react-hooks";
import {ACTIONS} from "@appchat/core/store/constants";
import {DELETE_MESSAGE} from "@appchat/data/message/queries";
import {IMessageDeleteButtonProps} from "@appchat/ui/elements/message/interfaces";
import * as React from "react";
import {useEffect} from "react";
import {FontIcon} from "react-md";
import {useDispatch} from "react-redux";

const MessageDeleteButton = ({active, id}: IMessageDeleteButtonProps) => {

  const [deleteMessage, {data: deleted, loading: deleting}] = useMutation(DELETE_MESSAGE);

  const dispatch = useDispatch();

  useEffect(() => {
    if (deleted && !deleting) {
      dispatch({type: ACTIONS.MESSAGE_DELETED, payload: { message: deleted.message } });
    }
    return () => { };
  }, [deleted]);

  return <FontIcon
    disabled={!active}
    onClick={
      (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        deleteMessage({ variables: {id} });
      }
    }>delete_sweep</FontIcon>;
};

export {MessageDeleteButton};
