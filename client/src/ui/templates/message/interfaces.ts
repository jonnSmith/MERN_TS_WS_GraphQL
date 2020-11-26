interface IMessageSendProps {
    onSubmit?: (variables: IMessageSendForm) => void;
}

interface IMessageSendForm {
    text: string;
}

export { IMessageSendForm, IMessageSendProps };
