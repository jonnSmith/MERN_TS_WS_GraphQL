import {SignUpFormInitialObject} from "@appchat/ui/templates/user/constants";
import {ISignUpForm, ISignUpProps} from "@appchat/ui/templates/user/interfaces";
import { Divider } from "@react-md/divider";
import * as React from "react";
import {Button, CardActions, Password, TextField} from "react-md";
import PasswordStrengthBar from "react-password-strength-bar";
import {CSSTransitionClassNames} from "react-transition-group/CSSTransition";

const UserSignUp = (props: ISignUpProps) => {

  const {onSubmit} = props;

  const [SignUpForm, updateSignUpForm] = React.useState(SignUpFormInitialObject);

  const sendSignUpForm = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(SignUpForm);
  };

  return (<form onSubmit={(event: React.FormEvent) => {
      event.preventDefault();
      sendSignUpForm(event);
    }}>
    <TextField
      id="email"
      name="email"
      onChange={(event: React.ChangeEvent<any>) => {
        updateSignUpForm({...SignUpForm, ...{email: event.currentTarget.value}});
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
      onChange={(event: React.ChangeEvent<any>) =>
        updateSignUpForm({...SignUpForm, ...{password: event.currentTarget.value}})}
    />
    <PasswordStrengthBar password={SignUpForm.password} />
    <TextField
      id="firstName"
      name="firstName"
      onChange={(event: React.ChangeEvent<any>) =>
        updateSignUpForm({...SignUpForm, ...{firstName: event.currentTarget.value}})}
      type="text"
      label="First Name"
      required={true}
    />
    <Divider />
    <TextField
      id="lastName"
      name="lastName"
      required={true}
      onChange={
        (event: React.ChangeEvent<any>) =>
          updateSignUpForm({...SignUpForm, ...{lastName: event.currentTarget.value}})}
      type="text"
      label="Last Name"
    />
    <Divider />
    <CardActions>
      <Button
        disableProgrammaticRipple
        disableRipple
        rippleTimeout={0}
        rippleClassNames={"appear" as CSSTransitionClassNames}
        themeType="outline"
        type="submit"
        disabled={Object.keys(SignUpForm).some((key: keyof ISignUpForm) => !SignUpForm[key])}
      >
        Sign Up
      </Button>
    </CardActions>
  </form>);
};

export {UserSignUp};
