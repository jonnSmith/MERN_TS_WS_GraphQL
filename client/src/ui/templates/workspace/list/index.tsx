import {ConfigSettings} from "@appchat/core/config";
import {IWorkspaceModel} from "@appchat/data/workspace/interfaces";
import {Avatar, BadgedButton, FontIcon, List, ListItem, useToggle} from "react-md";
import {useDebouncedCallback} from "use-debounce";
import * as React from "react";
import {useEffect} from "react";
import {CSSTransitionClassNames} from "react-transition-group/CSSTransition";
import {IRemoveWorkspace, IWorkpacesProps} from "@appchat/ui/templates/workspace/interfaces";

const WorkspaceList = (props: IWorkpacesProps) => {

  const {onDelete, list} = props;
  const [sending, enable, disable] = useToggle(false);

  const requestDeleteWorkspace = (variables: IRemoveWorkspace) => {
    onDelete(variables).then((result) => {
      // console.debug('result', result);
      if(result?.length) {
        disable();
      }
    });
  };

  const debounced = useDebouncedCallback(requestDeleteWorkspace, ConfigSettings.client.form.debounce.form);
  useEffect(() => () => {
    debounced.flush();
  }, [debounced]);

  return <List>
    {list.map((workspace: IWorkspaceModel) =>
      <ListItem
        leftAddon={<Avatar>{workspace.rating}</Avatar>}
        key={`workspace-${workspace.id}`}
        id={`ws-${workspace.id}`}
        rightAddon={<BadgedButton
          disableProgrammaticRipple
          disableRipple
          rippleTimeout={0}
          rippleClassNames={"appear" as CSSTransitionClassNames}
          buttonChildren={<FontIcon>delete</FontIcon>}
          theme={"error"}
          disabled={sending}
          onClick={ (e: React.MouseEvent<HTMLElement>) => {
            e.preventDefault();
            enable();
            debounced.callback({id: workspace.id});
          }}/>}>{workspace.name}</ListItem>)
    }
  </List>;
};

export {WorkspaceList};
