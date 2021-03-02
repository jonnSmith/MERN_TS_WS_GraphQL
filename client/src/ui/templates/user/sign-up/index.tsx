import {ConfigSettings} from "@appchat/core/config";
import {StateReturnTypes} from "@appchat/core/store/types";
import {FormButton} from "@appchat/ui/elements/form/button";
import {FormSelect} from "@appchat/ui/elements/form/select";
import {SignUpFormInitialObject} from "@appchat/ui/templates/user/constants";
import {ISignUpForm, ISignUpProps} from "@appchat/ui/templates/user/interfaces";
import * as React from "react";
import {FormEvent, useEffect, useState} from "react";
import {CardActions, Divider, Form, Password, TextField, useToggle} from "react-md";
import PasswordStrengthBar from "react-password-strength-bar";
import {useSelector} from "react-redux";
import { useDebounce, useDebouncedCallback } from "use-debounce";

const UserSignUp = (props: ISignUpProps) => {
  const [sending, enable, disable] = useToggle(false);
  const [passwordState, setPassword] = useState("");
  const [password] = useDebounce(passwordState, ConfigSettings.client.form.debounce.value);

  const {onSubmit} = props;
  const sendSignUpForm = (el: HTMLFormControlsCollection) => {
    Object.keys(SignUpFormInitialObject).forEach( (k) => {
       SignUpFormInitialObject[k as keyof ISignUpForm] = (
          el.namedItem(k) as HTMLInputElement || el.namedItem(`${k}-value`) as HTMLInputElement).value;
      });
    onSubmit(SignUpFormInitialObject).then((token) => {
      if (!token) { disable(); }
    });
  };
  const debounced = useDebouncedCallback(sendSignUpForm, ConfigSettings.client.form.debounce.form);
  useEffect(() => () => {
    debounced.flush();
  }, [debounced]);

  const workspacesOptions = useSelector((state: StateReturnTypes) => state.WorkspaceReducer.list);

  return (<Form onSubmit={(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    enable();
    debounced.callback(e.currentTarget.elements);
  }}>
    <TextField
      id="email"
      name="email"
      type="email"
      label="Email or Username"
      required={true}
      readOnly={sending}
    />
    <Divider />
    <Password
      id="password"
      name="password"
      label="Password"
      required={true}
      readOnly={sending}
      value={passwordState}
      onChange={(event: React.ChangeEvent<any>) => setPassword(event.currentTarget.value)}
    />
    <PasswordStrengthBar password={password} />
    <TextField
      id="firstName"
      name="firstName"
      type="text"
      label="First Name"
      readOnly={sending}
      required={true}
    />
    <Divider />
    <TextField
      id="lastName"
      name="lastName"
      readOnly={sending}
      required={true}
      type="text"
      label="Last Name"
    />
    <Divider style={{marginBottom: "20px"}} />
    <FormSelect id="workspaceId" sending={sending} options={workspacesOptions} label="Start in workspace:" value=""/>
    <CardActions>
      <FormButton sending={sending} title="Sign up" />
    </CardActions>
  </Form>);
};

export {UserSignUp};
