import {IMessageModel} from "@appchat/data/message/interfaces";
import {IUserModel} from "@appchat/data/user/interfaces";

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
    IMessageListProps};
