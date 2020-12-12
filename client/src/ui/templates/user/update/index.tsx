import {StateReturnTypes} from "@appchat/core/store/types";
import {IWorkspaceModel} from "@appchat/data/workspace/interfaces";
import {IUpdateProps} from "@appchat/ui/templates/user/interfaces";
import {checkFields} from "@appchat/ui/transformers";
import * as React from "react";
import {Button, CardActions, Divider, Select, TextField} from "react-md";
import {useSelector} from "react-redux";
import {CSSTransitionClassNames} from "react-transition-group/CSSTransition";

const UserUpdate = (props: IUpdateProps) => {
  const {onSubmit, user, loading} = props;
  const {list} = useSelector((state: StateReturnTypes) => state.WorkspaceReducer);

  React.useEffect(() => {
    if (list?.length && user && !list.some((w: IWorkspaceModel) => user?.workspaceId?.toString() === w.id.toString())) {
      updateUserForm({...UserForm, ...{workspaceId: list[0]?.id}});
    }
    return () => {};
  }, [list, user?.workspaceId]);

  const [UserForm, updateUserForm] = React.useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    workspaceId: user?.workspaceId
  });

  const sendUpdateUserForm = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(UserForm);
  };

  // tslint:disable-next-line:variable-name
  const selectWorkspace = React.useCallback((nextValue) => {
    updateUserForm({...UserForm, ...{workspaceId: nextValue}});
  }, []);

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
    <Divider />
    { UserForm.workspaceId && <Select
      id={`select-workspace`}
      onChange={selectWorkspace}
      options={list.map((ws: IWorkspaceModel) => ({ value: ws.id, label: ws.name }))}
      value={UserForm.workspaceId }
    />}
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
