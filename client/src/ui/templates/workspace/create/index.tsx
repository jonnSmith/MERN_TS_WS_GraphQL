import {WorkspaceCreateInitialObject} from "@appchat/ui/templates/workspace/constants";
import {IWorkspaceCreateProps} from "@appchat/ui/templates/workspace/interfaces";
import {checkFields} from "@appchat/ui/transformers";
import {Divider} from "@react-md/divider";
import * as React from "react";
import {Button, CardActions, Form, TextField} from "react-md";
import {CSSTransitionClassNames} from "react-transition-group/CSSTransition";

const WorkSpaceCreate = (props: IWorkspaceCreateProps) => {
  const {onCreate} = props;
  const [WorkspaceCreateForm, updateWorkspaceCreateForm] = React.useState(WorkspaceCreateInitialObject);

  const sendUpdateWorkspaceForm = (event: React.FormEvent) => {
    event.preventDefault();
    onCreate(WorkspaceCreateForm);
    updateWorkspaceCreateForm(WorkspaceCreateInitialObject);
  };

  return (<Form onSubmit={(event) => {
    event.preventDefault();
    sendUpdateWorkspaceForm(event);
  }}>
    <TextField
      id="name"
      name="name"
      type="text"
      label="Workspace Name"
      value={WorkspaceCreateForm.name}
      onChange={(event: React.ChangeEvent<any>) =>
        updateWorkspaceCreateForm({...WorkspaceCreateForm, ...{name: event.currentTarget.value}})}
    />
    <Divider/>
    <TextField
      required={true}
      id="rating"
      name="rating"
      label="Base Rating"
      type="number"
      max={10}
      min={1}
      value={"" + WorkspaceCreateForm.rating}
      onChange={(event: React.ChangeEvent<any>) =>
        updateWorkspaceCreateForm({...WorkspaceCreateForm, ...{rating: +event.currentTarget.value}})}
    />
    <Divider/>
    <CardActions className="md-cell md-cell--12">
      <Button
        theme={"secondary"}
        themeType={"contained"}
        type="submit"
        disableProgrammaticRipple
        disableRipple
        rippleTimeout={0}
        rippleClassNames={"appear" as CSSTransitionClassNames}
        disabled={checkFields(WorkspaceCreateForm)}>
        Save
      </Button>
    </CardActions>
  </Form>);
};

export {WorkSpaceCreate};
