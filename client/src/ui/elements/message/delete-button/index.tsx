import {IMessageDeleteButtonProps} from "@appchat/ui/elements/message/interfaces";
import * as React from "react";
import {FontIcon} from "react-md";

const MessageDeleteButton = ({active, onClick}: IMessageDeleteButtonProps) => {
  return <FontIcon
    disabled={!active}
    onClick={
      (event: React.MouseEvent<HTMLElement>) => onClick(event)
    }>delete_sweep</FontIcon>;
};

export {MessageDeleteButton};
