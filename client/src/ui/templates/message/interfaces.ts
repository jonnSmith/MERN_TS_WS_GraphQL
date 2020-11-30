interface IMessageSendProps {
    onSubmit?: (variables: IMessageSendForm) => void;
    loading: boolean;
}

interface IMessageSendForm {
    text: string;
}

interface IMessageListProps {
    onSubmit?: (variables: IMessageSendForm) => void;
    loading: boolean;
}

export { IMessageSendForm, IMessageSendProps };
