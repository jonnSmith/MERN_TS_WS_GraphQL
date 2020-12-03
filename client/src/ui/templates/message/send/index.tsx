import {MessageFormInitialObject} from "@appchat/ui/templates/message/constants";
import {IMessageSendForm, IMessageSendProps} from "@appchat/ui/templates/message/interfaces";
import * as React from "react";
import {Button, CardActions, TextField} from "react-md";
import {CSSTransitionClassNames} from "react-transition-group/CSSTransition";

const MessageSend = (props: IMessageSendProps) => {
  const {onSubmit, loading} = props;
  const [MessageForm, updateMessageForm] = React.useState(MessageFormInitialObject);
  const messageTextRef = React.useRef();

  const sendMessageForm = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(MessageForm);
    updateMessageForm({...MessageForm, ...{text: ""}});
  };

  return (<form onSubmit={(event: React.FormEvent) => { sendMessageForm(event); }}>
    <TextField
      id="text"
      name="text"
      value={MessageForm.text}
      onChange={(event: React.ChangeEvent<any>) =>
        updateMessageForm({...MessageForm, ...{text: event.currentTarget.value}})}
      maxLength={200}
      label="Write your message here..."
      disabled={loading}
      ref={messageTextRef}
    />
    <CardActions>
      <Button
        disableProgrammaticRipple
        disableRipple
        rippleTimeout={0}
        rippleClassNames={"appear" as CSSTransitionClassNames}
        disabled={Object.keys(MessageForm).some((key: keyof IMessageSendForm) => !MessageForm[key])}
        themeType="outline"
        type="submit">
        Send
      </Button>
    </CardActions>
  </form>);
};

export {MessageSend};
