import {ConfigSettings} from "@appchat/core/config";
import {StateReturnTypes} from "@appchat/core/store/types";
import {SignInFormInitialObject, SignUpFormInitialObject} from "@appchat/ui/templates/user/constants";
import {ISignInForm, ISignUpForm, ISignUpProps} from "@appchat/ui/templates/user/interfaces";
import {checkFields} from "@appchat/ui/transformers";
import {Avatar} from "@react-md/avatar";
import {Divider} from "@react-md/divider";
import {Select} from "@react-md/form";
import {CircularProgress} from "@react-md/progress";
import * as React from "react";
import {FormEvent, useEffect, useState} from "react";
import {Button, CardActions, FontIcon, Password, TextField, TextIconSpacing} from "react-md";
import PasswordStrengthBar from "react-password-strength-bar";
import {useSelector} from "react-redux";
import {CSSTransitionClassNames} from "react-transition-group/CSSTransition";
import { useDebounce, useDebouncedCallback } from "use-debounce";

const UserSignUp = (props: ISignUpProps) => {
  const [sending, toggleSending] = useState(false);
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
    onSubmit(SignUpFormInitialObject).then(() => {
        toggleSending(false);
      });
  };
  const debounced = useDebouncedCallback(sendSignUpForm, ConfigSettings.client.form.debounce.form);
  useEffect(() => () => {
    debounced.flush();
  }, [debounced]);

  const workspacesOptions = useSelector((state: StateReturnTypes) => state.WorkspaceReducer.list);

  return (<form onSubmit={(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toggleSending(true);
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
    <Divider />
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
      <Button
        disabled={sending}
        theme={"secondary"}
        themeType={"contained"}
        type="submit"
        disableProgrammaticRipple
        disableRipple
        rippleTimeout={0}
        children={
          <TextIconSpacing
            children={sending ? `Sending` : `Sign up`}
            iconAfter={false}
            icon={sending ?
              <CircularProgress id="loading-sign-up" style={{marginRight: "10px"}}/> :
              <FontIcon style={{width: "24px"}}>done</FontIcon>
            }/>}
        rippleClassNames={"appear" as CSSTransitionClassNames}/>
    </CardActions>
  </form>);
};

export {UserSignUp};
