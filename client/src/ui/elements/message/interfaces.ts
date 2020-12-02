import {IMessageModel} from "@appchat/data/message/interfaces";
import {IUserModel} from "@appchat/data/user/interfaces";
import * as React from "react";

interface IMessageListItemProps {
  message: IMessageModel;
  user?: IUserModel;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  active?: boolean;
}

interface IMessageDeleteButtonProps {
  active?: boolean;
  id: string;
}

interface IMessageListProps {
  message?: IMessageModel;
  active?: boolean;
}

export { IMessageDeleteButtonProps, IMessageListItemProps, IMessageListProps };
