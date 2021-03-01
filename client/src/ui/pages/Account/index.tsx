import { useMutation } from "@apollo/react-hooks";
import { ACTIONS } from "@appchat/core/store/constants";
import { StateReturnTypes } from "@appchat/core/store/types";
import { UPDATE_USER } from "@appchat/data/user/queries";
import { ADD_WORKSPACE, DELETE_WORKSPACE } from "@appchat/data/workspace/queries";
import { ContainerPage } from "@appchat/ui/containers/page";
import { IUpdateForm } from "@appchat/ui/templates/user/interfaces";
import { UserUpdate } from "@appchat/ui/templates/user/update";
import { WorkSpaceCreate } from "@appchat/ui/templates/workspace/create";
import { ICreateWorkspace, IRemoveWorkspace} from "@appchat/ui/templates/workspace/interfaces";
import { WorkspaceList } from "@appchat/ui/templates/workspace/list";
import { useSelector, useDispatch } from "react-redux";
import * as React from "react";
import { Grid, GridCell, Text } from "react-md";

const Account = () => {

  const dispatch = useDispatch();

  const [saveUser] = useMutation(UPDATE_USER);
  const [addWorkspace] = useMutation(ADD_WORKSPACE);
  const [deleteWorkspace] = useMutation(DELETE_WORKSPACE);

  const {user} = useSelector((state: StateReturnTypes) => state.UserReducer);
  const {list} = useSelector((state: StateReturnTypes) => state.WorkspaceReducer);

  const UpdateUser = async (variables: IUpdateForm) => {
    const {data} = await saveUser({ variables });
    dispatch({ type: ACTIONS.HANDLE_PAYLOAD, payload: data?.payload });
    return data?.payload?.user;
  };

  const createWorkspace = async (variables: ICreateWorkspace) => {
    const {data} = await addWorkspace({variables});
    return data?.workspaces;
  };

  const removeWorkspace = async (variables: IRemoveWorkspace) => {
    const { data } = await deleteWorkspace({variables});
    if(variables.id === user.workspaceId) {
      user.workspaceId = null;
      dispatch({ type: ACTIONS.USER_UPDATED, payload: { user, action: ACTIONS.USER_UPDATED} });
    }
    return data;
  }

  return (
    <ContainerPage title="Edit user" className="account">
      <Grid>
        <GridCell colSpan={4}>
          <Text type="headline-6" style={{ margin: "0 0 2rem 0" }}>Edit account</Text>
          {list && user && <UserUpdate
            list={list}
            user={user}
            onSubmit={UpdateUser} />}
        </GridCell>
        <GridCell colSpan={4}>
          <Text type="headline-6" style={{ margin: "0 0 2rem 0" }}>Create workspace</Text>
          <WorkSpaceCreate onCreate={createWorkspace} />
        </GridCell>
        <GridCell colSpan={4}>
          <Text type="headline-6" style={{ margin: "0 0 1.5rem 0" }}>Workspaces</Text>
          {list && <WorkspaceList list={list} onDelete={removeWorkspace} />}
        </GridCell>
      </Grid>
    </ContainerPage>);
};

export default Account;
