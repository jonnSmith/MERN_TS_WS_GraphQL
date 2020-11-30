import {IMessageModel} from "@appchat/data/message/interfaces";
import {IUserModel} from "@appchat/data/user/interfaces";

interface IMessageListItemProps {
  message: IMessageModel;
  user?: IUserModel;
  onDelete?: () => void;
  active?: boolean;
}

interface IMessageDeleteButtonProps {
  active?: boolean;
  onClick?: () => void;
}

interface IMessageListProps {
  message: IMessageModel;
  active?: boolean;
}

export { IMessageDeleteButtonProps, IMessageListItemProps, IMessageListProps };
