import {ConfigSettings} from "@appchat/core/config";
import {StateReturnTypes} from "@appchat/core/store/types";
import {FormButton} from "@appchat/ui/elements/form/button";
import {FormSelect} from "@appchat/ui/elements/form/select";
import {UpdateFormInitialObject} from "@appchat/ui/templates/user/constants";
import {ISignUpForm, IUpdateForm, IUpdateProps} from "@appchat/ui/templates/user/interfaces";
import {checkFields} from "@appchat/ui/transformers";
import * as React from "react";
import {FormEvent, useEffect, useRef, useState} from "react";
import {Button, CardActions, Divider, Form, TextField, useToggle} from "react-md";
import {useSelector} from "react-redux";
import {CSSTransitionClassNames} from "react-transition-group/CSSTransition";
import {useDebouncedCallback} from "use-debounce";

const UserUpdate = (props: IUpdateProps) => {
  const [sending, enable, disable] = useToggle(false);
  const {onSubmit} = props;
  const workspacesOptions = useSelector((state: StateReturnTypes) => state.WorkspaceReducer.list);
  const user = useSelector((state: StateReturnTypes) => state.UserReducer.user);

  const formRef = useRef();

  const sendUpdateUserForm = (el: HTMLFormControlsCollection) => {
    Object.keys(UpdateFormInitialObject).forEach( (k) => {
      UpdateFormInitialObject[k as keyof IUpdateForm] = (
        el.namedItem(k) as HTMLInputElement || el.namedItem(`${k}-value`) as HTMLInputElement).value;
    });
    onSubmit(UpdateFormInitialObject).then((updated) => {
      if (!updated) { disable(); }
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
      options={workspacesOptions}
      label="Select workspace"
      value={user?.workspaceId || ""} />
    <Divider/>
    <CardActions className="md-cell md-cell--12" style={{justifyContent: "flex-start"}}>
      <FormButton sending={sending} title="Update" />
    </CardActions>
  </Form>);
};

export {UserUpdate};
