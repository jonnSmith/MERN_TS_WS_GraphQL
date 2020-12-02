import {SetFloatingTextInputRefs} from "@appchat/ui/templates/functions";
import {SignInFormInitialObject} from "@appchat/ui/templates/user/constants";
import {ISignInForm, ISignInProps} from "@appchat/ui/templates/user/interfaces";
import * as React from "react";
import {Button, CardActions, TextField} from "react-md";

const UserSignIn = (props: ISignInProps) => {

  const {onSubmit} = props;
  const [SignInForm, updateSignInForm] = React.useState(SignInFormInitialObject);

  const sendSignInForm = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(SignInForm);
  };

  const passwordRef = React.useRef();
  const emailRef = React.useRef();

  return (<form
    className="md-grid text-fields__application md-grid--no-spacing"
    onSubmit={(event) => { event.preventDefault(); sendSignInForm(event); }}
  >
    <TextField
      required
      id="email"
      name="email"
      type="email"
      label="Email or Username"
      value={SignInForm.email}
      onChange={(event: React.ChangeEvent<any>) =>
        updateSignInForm({...SignInForm, ...{email: event.currentTarget.value}})}
    />
    <TextField
      required
      id="password"
      name="password"
      type="password"
      label="Password"
      value={SignInForm.password}
      onChange={(event: React.ChangeEvent<any>) =>
      updateSignInForm({...SignInForm, ...{password: event.currentTarget.value}})}
    />
    <CardActions className="md-cell md-cell--12">
      <Button
        className="md-cell--right"
        type="submit"
        disableProgrammaticRipple disableRipple rippleTimeout={0} rippleClassNames="">
        Sign In
      </Button>
    </CardActions>
  </form>);
};

export {UserSignIn};
