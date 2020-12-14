import {StateReturnTypes} from "@appchat/core/store/types";
import {SignUpFormInitialObject} from "@appchat/ui/templates/user/constants";
import {ISignUpProps} from "@appchat/ui/templates/user/interfaces";
import {checkFields} from "@appchat/ui/transformers";
import {Avatar} from "@react-md/avatar";
import {Divider} from "@react-md/divider";
import {Select} from "@react-md/form";
import * as React from "react";
import {useEffect} from "react";
import {Button, CardActions, Password, TextField} from "react-md";
import PasswordStrengthBar from "react-password-strength-bar";
import {useSelector} from "react-redux";
import {CSSTransitionClassNames} from "react-transition-group/CSSTransition";
import { useDebouncedCallback } from "use-debounce";

const UserSignUp = (props: ISignUpProps) => {

  const {onSubmit} = props;

  const [SignUpForm, updateSignUpForm] = React.useState(SignUpFormInitialObject);

  const sendSignUpForm = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(SignUpForm);
  };

  const debounced = useDebouncedCallback( (value) => { updateSignUpForm(value); }, 10 );
  useEffect(() => () => { debounced.flush(); }, [debounced]);

  const workspacesOptions = useSelector((state: StateReturnTypes) => state.WorkspaceReducer.list);

  useEffect(() => {
    if (workspacesOptions.length && !SignUpForm.workspaceId) {
      debounced.callback( {...SignUpForm, ...{workspaceId: workspacesOptions[0]?.id}});
    }
  }, [workspacesOptions]);

  return (<form onSubmit={(event: React.FormEvent) => {
      event.preventDefault();
      sendSignUpForm(event);
    }}>
    <TextField
      id="email"
      name="email"
      value={SignUpForm.email}
      onChange={(event: React.ChangeEvent<any>) => {
        debounced.callback({...SignUpForm, ...{email: event.currentTarget.value}});
      }}
      type="email"
      label="Email or Username"
      required={true}
    />
    <Divider />
    <Password
      id="password"
      name="password"
      label="Password"
      required={true}
      value={SignUpForm.password}
      onChange={(event: React.ChangeEvent<any>) =>
        debounced.callback({...SignUpForm, ...{password: event.currentTarget.value}})}
    />
    <PasswordStrengthBar password={SignUpForm.password} />
    <TextField
      id="firstName"
      name="firstName"
      value={SignUpForm.firstName}
      onChange={(event: React.ChangeEvent<any>) =>
        debounced.callback({...SignUpForm, ...{firstName: event.currentTarget.value}})}
      type="text"
      label="First Name"
      required={true}
    />
    <Divider />
    <TextField
      id="lastName"
      name="lastName"
      required={true}
      value={SignUpForm.lastName}
      onChange={
        (event: React.ChangeEvent<any>) =>
          debounced.callback({...SignUpForm, ...{lastName: event.currentTarget.value}})}
      type="text"
      label="Last Name"
    />
    <Divider />
    <Select
      id="custom-select-1"
      options={workspacesOptions}
      labelKey="name"
      valueKey="id"
      value={SignUpForm.workspaceId}
      label="Start in workspace:"
      onChange={
        (nextValue ) => { debounced.callback( {...SignUpForm, ...{workspaceId: nextValue}}); }
      }
      disableMovementChange={true}/>
    <CardActions>
      <Button
        disableProgrammaticRipple
        disableRipple
        rippleTimeout={0}
        rippleClassNames={"appear" as CSSTransitionClassNames}
        theme={"secondary"}
        themeType={"contained"}
        type="submit"
        disabled={checkFields(SignUpForm)}
      >
        Sign Up
      </Button>
    </CardActions>
  </form>);
};

export {UserSignUp};
