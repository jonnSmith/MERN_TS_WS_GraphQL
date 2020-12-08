import {SignInFormInitialObject} from "@appchat/ui/templates/user/constants";
import {ISignInForm, ISignInProps} from "@appchat/ui/templates/user/interfaces";
import { Divider } from "@react-md/divider";
import * as React from "react";
import {Button, CardActions, Password, TextField} from "react-md";
import {CSSTransitionClassNames} from "react-transition-group/CSSTransition";

const UserSignIn = (props: ISignInProps) => {
  const {onSubmit} = props;
  const [SignInForm, updateSignInForm] = React.useState(SignInFormInitialObject);

  const sendSignInForm = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(SignInForm);
  };

  const checkFields = (formFields: ISignInForm) =>
    Object.keys(formFields).some((key: keyof typeof formFields) => !formFields[key]);

  return (<form onSubmit={(event) => { event.preventDefault(); sendSignInForm(event); }}>
    <TextField
      required={true}
      id="email"
      name="email"
      type="email"
      label="Email or Username"
      value={SignInForm.email}
      onChange={(event: React.ChangeEvent<any>) =>
        updateSignInForm({...SignInForm, ...{email: event.currentTarget.value}})}
    />
    <Divider />
    <Password
      required={true}
      id="password"
      name="password"
      label="Password"
      value={SignInForm.password}
      onChange={(event: React.ChangeEvent<any>) =>
      updateSignInForm({...SignInForm, ...{password: event.currentTarget.value}})}
    />
    <CardActions className="md-cell md-cell--12">
      <Button
        theme={"secondary"}
        themeType={"contained"}
        type="submit"
        disableProgrammaticRipple
        disableRipple
        rippleTimeout={0}
        rippleClassNames={"appear" as CSSTransitionClassNames}
        disabled={checkFields(SignInForm)}>
        Sign In
      </Button>
    </CardActions>
  </form>);
};

export {UserSignIn};
