import {SignUpFormInitialObject} from "@appchat/ui/templates/user/constants";
import {ISignUpProps} from "@appchat/ui/templates/user/interfaces";
import * as React from "react";
import {Button, CardActions, TextField} from "react-md";
import {CSSTransitionClassNames} from "react-transition-group/CSSTransition";

const UserSignUp = (props: ISignUpProps) => {

  const {onSubmit} = props;

  const passwordRef = React.useRef();
  const emailRef = React.useRef();

  const [SignUpForm, updateSignUpForm] = React.useState(SignUpFormInitialObject);

  const sendSignUpForm = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(SignUpForm);
  };

  return (<form className="md-grid md-grid--no-spacing text-fields__application"
    onSubmit={(event: React.FormEvent) => {
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
      className="md-cell md-cell--12"
      ref={emailRef}
    />
    <TextField
      id="password"
      name="password"
      onChange={(event: React.ChangeEvent<any>) =>
        updateSignUpForm({...SignUpForm, ...{password: event.currentTarget.value}})}
      type="password"
      label="Password"
      className="md-cell md-cell--12"
      ref={passwordRef}
    />
    <TextField
      id="firstName"
      name="firstName"
      onChange={(event: React.ChangeEvent<any>) =>
        updateSignUpForm({...SignUpForm, ...{firstName: event.currentTarget.value}})}
      type="text"
      label="First Name"
      className="md-cell md-cell--12"
    />
    <TextField
      id="lastName"
      name="lastName"
      onChange={
        (event: React.ChangeEvent<any>) =>
          updateSignUpForm({...SignUpForm, ...{lastName: event.currentTarget.value}})}
      type="text"
      label="Last Name"
      className="md-cell md-cell--12"
    />
    <CardActions className="md-cell md-cell--12">
      <Button
        disableProgrammaticRipple
        disableRipple
        rippleTimeout={0}
        rippleClassNames={"appear" as CSSTransitionClassNames}
        className="md-cell--right"
        type="submit"
      >
        Sign Up
      </Button>
    </CardActions>
  </form>);
};

export {UserSignUp};
