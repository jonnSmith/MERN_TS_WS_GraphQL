import {ConfigSettings} from "@appchat/core/config";
import {SignInFormInitialObject} from "@appchat/ui/templates/user/constants";
import {ISignInForm, ISignInProps} from "@appchat/ui/templates/user/interfaces";
import {checkFields} from "@appchat/ui/transformers";
import {Divider} from "@react-md/divider";
import {
  CircularProgress,
  getProgressA11y,
  LinearProgress,
} from "@react-md/progress";
import * as React from "react";
import {FormEvent, useEffect, useState} from "react";
import {Button, CardActions, FontIcon, Form, Password, TextField, TextIconSpacing} from "react-md";
import {CSSTransitionClassNames} from "react-transition-group/CSSTransition";
import {useDebouncedCallback} from "use-debounce";

const UserSignIn = (props: ISignInProps) => {
  const {onSubmit} = props;
  const [sending, toggleSending] = useState(false);

  const sendSignInForm = (el: HTMLFormControlsCollection) => {
    Object.keys(SignInFormInitialObject).forEach( (k) => {
      SignInFormInitialObject[k as keyof ISignInForm] = (el.namedItem(k) as HTMLInputElement).value;
    });
    onSubmit(SignInFormInitialObject).then(() => {
      toggleSending(false);
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
        toggleSending(true);
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
            children={sending ? `Sending` : `Sign in`}
            iconAfter={false}
            icon={sending ?
              <CircularProgress id="loading-sign-in" style={{marginRight: "10px"}}/> :
              <FontIcon style={{width: "24px"}}>done</FontIcon>
            }/>}
        rippleClassNames={"appear" as CSSTransitionClassNames}/>
    </CardActions>
  </Form>;
};

export {UserSignIn};
