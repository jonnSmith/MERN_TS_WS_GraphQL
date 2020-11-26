import {MessageFormInitialObject} from "@appchat/ui/templates/message/constants";
import {IMessageSendProps} from "@appchat/ui/templates/message/interfaces";
import * as React from "react";
import {Button, CardActions, TextField} from "react-md";

const MessageSend = (props: IMessageSendProps) => {

    const {onSubmit} = props;

    const[MessageForm, updateMessageForm] = React.useState(MessageFormInitialObject);

    const sendMessageForm = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit(MessageForm);
    };

    return(<form className="md-grid text-fields__application"
        onSubmit={(event: React.FormEvent) => { sendMessageForm(event); }}
    >
        <TextField
            id="text"
            name="text"
            onChange={ (value) => { updateMessageForm({...MessageForm, ...{ message: value as string}}); } }
            rows={2}
            maxLength={200}
            label="Message text"
            className="md-cell md-cell--12"
        />
        <CardActions className="md-cell md-cell--12">
            <Button
                raised
                primary
                className="md-cell--right"
                disabled={false}
                type="submit">
                Send
            </Button>
        </CardActions>
    </form>);
};

export {MessageSend};