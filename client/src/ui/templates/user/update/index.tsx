import {ConfigSettings} from "@appchat/core/config";
import {FormButton} from "@appchat/ui/elements/form/button";
import {FormSelect} from "@appchat/ui/elements/form/select";
import {UpdateFormInitialObject} from "@appchat/ui/templates/user/constants";
import {IUpdateForm, IUpdateProps} from "@appchat/ui/templates/user/interfaces";
import * as React from "react";
import {FormEvent, useEffect, useRef} from "react";
import {CardActions, Divider, Form, TextField, useToggle} from "react-md";
import {useDebouncedCallback} from "use-debounce";

const UserUpdate = (props: IUpdateProps) => {
  const [sending, enable, disable] = useToggle(false);
  const {onSubmit, user, list} = props;

  const formRef = useRef<HTMLFormElement>(null);

  const sendUpdateUserForm = (el: HTMLFormControlsCollection) => {
    const UpdateFormObject = {...UpdateFormInitialObject};
    Object.keys(UpdateFormObject).forEach( (k) => {
      UpdateFormObject[k as keyof IUpdateForm] =
        (el.namedItem(k) as HTMLInputElement || el.namedItem(`${k}-value`) as HTMLInputElement).value;
    });
    onSubmit(UpdateFormObject).then((updatedUser) => {
      if (updatedUser) {
        // console.debug('update', updatedUser);
        formRef?.current?.reset();
        disable();
       }
    });
  };

  const debounced = useDebouncedCallback(sendUpdateUserForm, ConfigSettings.client.form.debounce.form);
  useEffect(() => () => {
    debounced.flush();
  }, [debounced]);

  return (<Form
    ref={formRef}
    onSubmit={(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    enable();
    debounced.callback(e.currentTarget.elements);
  }}>
    <TextField
      required={true}
      id="firstName"
      name="firstName"
      type="text"
      label="First Name"
      readOnly={sending}
      defaultValue={user.firstName}
    />
    <Divider/>
    <TextField
      required={true}
      id="lastName"
      name="lastName"
      label="Last Name"
      readOnly={sending}
      defaultValue={user.lastName}
    />
    <Divider />
    <FormSelect
      id="workspaceId"
      sending={sending}
      options={list}
      label="Select workspace"
      value={user?.workspaceId} />
    <Divider/>
    <CardActions className="md-cell md-cell--12" style={{justifyContent: "flex-start"}}>
      <FormButton sending={sending} title="Update" />
    </CardActions>
  </Form>);
};

export {UserUpdate};
