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

interface IMessageDeleteOptions {
    variables: {
        id: string;
    };
}

interface IMessageListProps {
    callDelete?: (variables: IMessageDeleteOptions) => Promise<IMessageModel>;
    active?: boolean;
    user?: IUserModel;
    message?: IMessageModel;
}

interface IMessageSendProps {
    onSubmit?: (variables: IMessageSendForm) => Promise<IMessageModel>;
    loading?: boolean;
    user?: IUserModel;
}

interface IMessageSendForm {
    text: string;
    workspaceId: string;
}

export {
    IMessageSendForm,
    IMessageSendProps,
    IMessageDeleteButtonProps,
    IMessageDeleteOptions,
    IMessageListItemProps,
    IMessageListProps};
