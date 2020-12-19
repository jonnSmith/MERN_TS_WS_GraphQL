import {ConfigSettings} from "@appchat/core/config";
import {StateReturnTypes} from "@appchat/core/store/types";
import {FormButton} from "@appchat/ui/elements/form/button";
import {SignUpFormInitialObject} from "@appchat/ui/templates/user/constants";
import {ISignUpForm, ISignUpProps} from "@appchat/ui/templates/user/interfaces";
import {Divider} from "@react-md/divider";
import {Select} from "@react-md/form";
import * as React from "react";
import {FormEvent, useEffect, useState} from "react";
import {CardActions, Password, TextField, useToggle} from "react-md";
import PasswordStrengthBar from "react-password-strength-bar";
import {useSelector} from "react-redux";
import { useDebounce, useDebouncedCallback } from "use-debounce";

const UserSignUp = (props: ISignUpProps) => {
  const [sending, enable, disable] = useToggle(false);
  const [passwordState, setPassword] = useState("");
  const [workspaceIdState, setWorkspaceId] = useState("");
  const [password] = useDebounce(passwordState, ConfigSettings.client.form.debounce.value);
  const [workspace] = useDebounce(workspaceIdState, ConfigSettings.client.form.debounce.value);

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

  useEffect(() => {
    if (!workspaceIdState && workspacesOptions?.length) { setWorkspaceId(workspacesOptions[0].id); }
    return () => {};
  }, [workspacesOptions]);

  return (<form onSubmit={(e: FormEvent<HTMLFormElement>) => {
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
    <Select
      id="workspaceId"
      readOnly={sending}
      options={workspacesOptions}
      defaultChecked={true}
      labelKey="name"
      valueKey="id"
      value={workspace}
      label="Start in workspace:"
      onChange={
        (nextValue ) => { setWorkspaceId(nextValue); }
      }
      disableMovementChange={true}/>
    <CardActions>
      <FormButton sending={sending} title="Sign up" />
    </CardActions>
  </form>);
};

export {UserSignUp};
