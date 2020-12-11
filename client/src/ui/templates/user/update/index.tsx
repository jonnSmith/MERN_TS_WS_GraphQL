import {IUpdateProps} from "@appchat/ui/templates/user/interfaces";
import {checkFields} from "@appchat/ui/templates/user/transformers";
import {Divider} from "@react-md/divider";
import * as React from "react";
import {Button, CardActions, TextField} from "react-md";
import {CSSTransitionClassNames} from "react-transition-group/CSSTransition";

const UserUpdate = (props: IUpdateProps) => {

  const {onSubmit, user, loading} = props;
  const [UserForm, updateUserForm] = React.useState({ lastName: user.lastName, firstName: user.firstName});

  const sendUpdateUserForm = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(UserForm);
  };

  return (<form onSubmit={(event) => {
    event.preventDefault();
    sendUpdateUserForm(event);
  }}>
    <TextField
      required={true}
      id="firstName"
      name="firstName"
      type="text"
      label="First Name"
      value={UserForm.firstName}
      onChange={(event: React.ChangeEvent<any>) =>
        updateUserForm({...UserForm, ...{firstName: event.currentTarget.value}})}
    />
    <Divider/>
    <TextField
      required={true}
      id="lastName"
      name="lastName"
      label="Last Name"
      value={UserForm.lastName}
      onChange={(event: React.ChangeEvent<any>) =>
        updateUserForm({...UserForm, ...{lastName: event.currentTarget.value}})}
    />
    <Divider/>
    <CardActions className="md-cell md-cell--12" style={{justifyContent: "flex-start"}}>
      <Button
        theme={"secondary"}
        themeType={"contained"}
        type="submit"
        disableProgrammaticRipple
        disableRipple
        rippleTimeout={0}
        rippleClassNames={"appear" as CSSTransitionClassNames}
        disabled={checkFields(UserForm) || loading}>
        Save
      </Button>
    </CardActions>
  </form>);
};

export {UserUpdate};
