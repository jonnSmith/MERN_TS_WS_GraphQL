import {MessageFormInitialObject} from "@appchat/ui/templates/message/constants";
import {ConfigSettings} from "@appchat/core/config";
import {IMessageSendForm, IMessageSendProps} from "@appchat/ui/templates/message/interfaces";
import * as React from "react";
import {useEffect, useRef, FormEvent} from "react";
import {CardActions, TextField, Form, useToggle} from "react-md";
import {FormButton} from "@appchat/ui/elements/form/button";
import {useDebouncedCallback} from "use-debounce";

const MessageSend = (props: IMessageSendProps) => {
  const {onSubmit, user} = props;
  const [sending, enable, disable] = useToggle(false);
  const formRef = useRef<HTMLFormElement>(null);

  const sendMessageForm = (el: HTMLFormControlsCollection) => {
    Object.keys(MessageFormInitialObject).forEach( (k) => {
      MessageFormInitialObject[k as keyof IMessageSendForm] = (el.namedItem(k) as HTMLInputElement).value;
    });
    onSubmit(MessageFormInitialObject).then((message) => {
      if(message?.id) {
        formRef?.current?.reset();
        disable(); }
    });
  };

  const debounced = useDebouncedCallback(sendMessageForm, ConfigSettings.client.form.debounce.form);
  useEffect(() => () => {
    debounced.flush();
  }, [debounced]);

  return (<Form
    ref={formRef}
    onSubmit={
      (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        enable();
        debounced.callback(e.currentTarget.elements);
      }}>
    <TextField
      id="text"
      name="text"
      label="Write your message here..."
      readOnly={sending}
      required={true}
    />
    <input type="text" id="workspaceId" name="workspaceId" defaultValue={user?.workspaceId} required={true} hidden={true}/>
    <CardActions>
      <FormButton
      sending={sending}
      title="Send"/>
    </CardActions>
  </Form>);
};

export {MessageSend};
