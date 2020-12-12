import {useMutation} from "@apollo/react-hooks";
import {StateReturnTypes} from "@appchat/core/store/types";
import {IWorkspaceModel} from "@appchat/data/workspace/interfaces";
import {DELETE_WORKSPACE} from "@appchat/data/workspace/queries";
import {Avatar} from "@react-md/avatar";
import {BadgedButton} from "@react-md/badge";
import {FontIcon} from "@react-md/icon";
import {List, ListItem, ListSubheader} from "@react-md/list";
import * as React from "react";
import {useSelector} from "react-redux";
import {CSSTransitionClassNames} from "react-transition-group/CSSTransition";

const WorkspaceList = () => {
  const {list} = useSelector((state: StateReturnTypes) => state.WorkspaceReducer);

  const [deleteWorkspace,
    {loading: deleting}] = useMutation(DELETE_WORKSPACE);

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
            disabled={deleting}
            onClick={async (event: React.MouseEvent<HTMLElement>) => {
              event.preventDefault();
              await deleteWorkspace({variables: {id: workspace.id}});
            }}/>}>{workspace.name}</ListItem>)
    }
  </List>;
};

export {WorkspaceList};
