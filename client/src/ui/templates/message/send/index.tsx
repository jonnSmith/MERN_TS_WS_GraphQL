import {MessageFormInitialObject} from "@appchat/ui/templates/message/constants";
import {IMessageSendForm, IMessageSendProps} from "@appchat/ui/templates/message/interfaces";
import * as React from "react";
import {Button, CardActions, TextField} from "react-md";

const MessageSend = (props: IMessageSendProps) => {

  const {onSubmit, loading} = props;

  const [MessageForm, updateMessageForm] = React.useState(MessageFormInitialObject);

  const messageTextRef = React.useRef();

  const sendMessageForm = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(MessageForm);
    updateMessageForm({...MessageForm, ...{text: ""}});
  };

  return (<form className="md-grid text-fields__application"
                onSubmit={(event: React.FormEvent) => {
                  sendMessageForm(event);
                }}
  >
    <TextField
      id="text"
      name="text"
      value={MessageForm.text}
      onChange={(event: React.ChangeEvent<any>) =>
        updateMessageForm({...MessageForm, ...{text: event.currentTarget.value}})}
      rows={2}
      maxLength={200}
      label="Message text"
      className="md-cell md-cell--12"
      disabled={loading}
      ref={messageTextRef}
    />
    <CardActions className="md-cell md-cell--12">
      <Button
        disableProgrammaticRipple disableRipple rippleTimeout={0} rippleClassNames=""
        className="md-cell--right"
        disabled={Object.keys(MessageForm).some((key: keyof IMessageSendForm) => !MessageForm[key])}
        type="submit">
        Send
      </Button>
    </CardActions>
  </form>);
};

export {MessageSend};
