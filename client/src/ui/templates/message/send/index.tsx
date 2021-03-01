import {MessageFormInitialObject} from "@appchat/ui/templates/message/constants";
import {IMessageSendForm, IMessageSendProps} from "@appchat/ui/templates/message/interfaces";
import * as React from "react";
import {useEffect} from "react";
import {CardActions, TextField, Form} from "react-md";
import {FormButton} from "@appchat/ui/elements/form/button";

const MessageSend = (props: IMessageSendProps) => {
  const {onSubmit, loading, user} = props;
  const [MessageForm, updateMessageForm] = React.useState(MessageFormInitialObject);
  const messageTextRef = React.useRef();


  const sendMessageForm = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(MessageForm);
    updateMessageForm({...MessageForm, ...{text: ""}});
  };

  useEffect(() => {
    if (user && user?.workspaceId && !MessageForm?.workspaceId) {
      updateMessageForm({...MessageForm, ...{workspaceId: user?.workspaceId}});
    }
  }, [user]);

  return (<Form onSubmit={(event: React.FormEvent) => { sendMessageForm(event); }}>
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
      <FormButton
      sending={loading}
      title="Send"
      disabled={Object.keys(MessageForm).some((key: keyof IMessageSendForm) => !MessageForm[key])}/>
    </CardActions>
  </Form>);
};

export {MessageSend};
