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
    callDelete?: (variables: IMessageDeleteOptions) => void;
    active?: boolean;
}

interface IMessageSendProps {
    onSubmit?: (variables: IMessageSendForm) => void;
    loading: boolean;
}

interface IMessageSendForm {
    text: string;
}

export {
    IMessageSendForm,
    IMessageSendProps,
    IMessageDeleteButtonProps,
    IMessageDeleteOptions,
    IMessageListItemProps,
    IMessageListProps};
