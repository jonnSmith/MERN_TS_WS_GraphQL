import {ConfigSettings} from "@appchat/core/config";
import {WorkspaceCreateInitialObject} from "@appchat/ui/templates/workspace/constants";
import {IWorkspaceCreateProps, IWorkspaceCreateForm} from "@appchat/ui/templates/workspace/interfaces";
import {Divider} from "@react-md/divider";
import * as React from "react";
import {FormEvent, useEffect, useRef} from "react";
import {CardActions, Form, TextField, useToggle} from "react-md";
import {FormButton} from "@appchat/ui/elements/form/button";
import {useDebouncedCallback} from "use-debounce";

const WorkSpaceCreate = (props: IWorkspaceCreateProps) => {
  const {onCreate} = props;
  const [sending, enable, disable] = useToggle(false);
  const formRef = useRef<HTMLFormElement>(null);

  const formatWorkspace = (ws: any) => {
    ws.rating = +ws.rating;
    return ws;
  }

  const sendCreateWorkspaceForm = (el: HTMLFormControlsCollection) => {
    const WorkspaceCreateObject = {...WorkspaceCreateInitialObject}
    Object.keys(WorkspaceCreateObject).forEach((k) => {
      WorkspaceCreateObject[k as keyof IWorkspaceCreateForm] = (
        el.namedItem(k) as HTMLInputElement || el.namedItem(`${k}-value`) as HTMLInputElement).value;
    });
    onCreate({ input: formatWorkspace(WorkspaceCreateObject) }).then((result) => {
      if(result?.length) {
        formRef?.current?.reset();
        disable();
      }
    });
  };

  const debounced = useDebouncedCallback(sendCreateWorkspaceForm, ConfigSettings.client.form.debounce.form);
  useEffect(() => () => {
    debounced.flush();
  }, [debounced]);

  return (<Form
    ref={formRef}
    onSubmit={(e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      enable();
      debounced.callback(e.currentTarget.elements);
  }}>
    <TextField
      id="name"
      name="name"
      type="text"
      label="Workspace Name"
      placeholder="Workspace Name"
      readOnly={sending}
      required={true}
    />
    <Divider />
    <TextField
      id="rating"
      name="rating"
      label="Base Rating"
      type="number"
      max={10}
      min={1}
      readOnly={sending}
      required={true}
    />
    <Divider />
    <CardActions className="md-cell md-cell--12">
      <FormButton sending={sending} title="Create" />
    </CardActions>
  </Form>);
};

export { WorkSpaceCreate };
