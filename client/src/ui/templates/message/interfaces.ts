interface IMessageSendProps {
    onSubmit?: (variables: IMessageSendForm) => void;
}

interface IMessageSendForm {
    message: string;
}

export { IMessageSendForm, IMessageSendProps };
