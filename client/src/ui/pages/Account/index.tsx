import {useMutation} from "@apollo/react-hooks";
import {ACTIONS} from "@appchat/core/store/constants";
import {StateReturnTypes} from "@appchat/core/store/types";
import {UPDATE_USER} from "@appchat/data/user/queries";
import {IWorkspaceModel} from "@appchat/data/workspace/interfaces";
import {ADD_WORKSPACE} from "@appchat/data/workspace/queries";
import {ContainerPage} from "@appchat/ui/containers/page";
import {IUpdateForm} from "@appchat/ui/templates/user/interfaces";
import {UserUpdate} from "@appchat/ui/templates/user/update";
import {WorkSpaceCreate} from "@appchat/ui/templates/workspace/create";
import {IWorkspaceCreateForm} from "@appchat/ui/templates/workspace/interfaces";
import {WorkspaceList} from "@appchat/ui/templates/workspace/list";
import * as React from "react";
import { Grid, GridCell, Text } from "react-md";
import {useDispatch, useSelector} from "react-redux";

const Account = () => {

  const dispatch = useDispatch();
  const [saveUser] = useMutation(UPDATE_USER);
  const [addWorkspace, {data: workspace, loading: saving}] = useMutation(ADD_WORKSPACE);

  const UpdateUser = async (variables: IUpdateForm) => {
    const {data} = await saveUser({variables});
    console.debug("data", data);
    await dispatch({type: ACTIONS.HANDLE_PAYLOAD, payload: data?.payload});
    return false;
  };

  const CreateWorkspace = (input: IWorkspaceModel) => {
    addWorkspace({ variables: {input} });
  };

  React.useLayoutEffect(() => {
    if (workspace?.id) {
      dispatch({type: ACTIONS.WORKSPACE_ADDED, payload: {workspace}});
    }
  }, [workspace]);

  return (
    <ContainerPage title="Edit user" className="account">
      <Grid>
        <GridCell colSpan={4}>
          <Text type="headline-6" style={{margin: "0 0 2rem 0"}}>Edit account</Text>
          <UserUpdate
            onSubmit={UpdateUser}/>
        </GridCell>
        <GridCell colSpan={4}>
          <Text type="headline-6" style={{margin: "0 0 2rem 0"}}>Create workspace</Text>
          <WorkSpaceCreate onCreate={(s: IWorkspaceCreateForm) => { CreateWorkspace(s); }} />
        </GridCell>
        <GridCell colSpan={4}>
          <Text type="headline-6" style={{margin: "0 0 1.5rem 0"}}>Workspaces</Text>
          <WorkspaceList />
        </GridCell>
      </Grid>
    </ContainerPage>);
};

export default Account;
