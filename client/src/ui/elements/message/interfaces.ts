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
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

interface IMessageListProps {
  message?: IMessageModel;
  active?: boolean;
  onDelete?: (event: React.MouseEvent<HTMLElement>, id: string) => void;
}

export { IMessageDeleteButtonProps, IMessageListItemProps, IMessageListProps };
