import {ConfigSettings} from "@appchat/core/config";
import {FormButton} from "@appchat/ui/elements/form/button";
import {SignInFormInitialObject} from "@appchat/ui/templates/user/constants";
import {ISignInForm, ISignInProps} from "@appchat/ui/templates/user/interfaces";
import * as React from "react";
import {FormEvent, useEffect} from "react";
import {
  CardActions,
  Divider,
  Form,
  Password,
  TextField,
  useToggle} from "react-md";
import {useDebouncedCallback} from "use-debounce";

const UserSignIn = (props: ISignInProps) => {
  const {onSubmit} = props;
  const [sending, enable, disable] = useToggle(false);

  const sendSignInForm = (el: HTMLFormControlsCollection) => {
    Object.keys(SignInFormInitialObject).forEach( (k) => {
      SignInFormInitialObject[k as keyof ISignInForm] = (el.namedItem(k) as HTMLInputElement).value;
    });
    onSubmit(SignInFormInitialObject).then((token) => {
      if (!token) { disable(); }
    });
  };

  const debounced = useDebouncedCallback(sendSignInForm, ConfigSettings.client.form.debounce.form);
  useEffect(() => () => {
    debounced.flush();
  }, [debounced]);

  return <Form
    onSubmit={
      (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        enable();
        debounced.callback(e.currentTarget.elements);
      }}>
    <TextField
      readOnly={sending}
      required={true}
      id="email"
      name="email"
      type="email"
      label="Email or Username"
    />
    <Divider/>
    <Password
      readOnly={sending}
      required={true}
      id="password"
      name="password"
      label="Password"
    />
    <Divider/>
    <CardActions className="md-cell md-cell--12">
      <FormButton sending={sending} title="Sign in"/>
    </CardActions>
  </Form>;
};

export {UserSignIn};
