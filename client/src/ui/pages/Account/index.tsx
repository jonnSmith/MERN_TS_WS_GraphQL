import {useMutation} from "@apollo/react-hooks";
import {ACTIONS} from "@appchat/core/store/constants";
import {StateReturnTypes} from "@appchat/core/store/types";
import {UPDATE_USER} from "@appchat/data/user/queries";
import {ADD_WORKSPACE} from "@appchat/data/workspace/queries";
import {ContainerPage} from "@appchat/ui/containers/page";
import {IUpdateForm} from "@appchat/ui/templates/user/interfaces";
import {UserUpdate} from "@appchat/ui/templates/user/update";
import {WorkSpaceCreate} from "@appchat/ui/templates/workspace/create";
import {IWorkspaceCreateForm} from "@appchat/ui/templates/workspace/interfaces";
import * as React from "react";
import { Grid, GridCell, Text } from "react-md";
import {useDispatch, useSelector} from "react-redux";

const Account = () => {
  const {user} = useSelector((state: StateReturnTypes) => state.UserReducer);
  const dispatch = useDispatch();
  const [saveUser, {data, loading}] = useMutation(UPDATE_USER);
  const [addWorkspace, {data: workspace, loading: saving}] = useMutation(ADD_WORKSPACE);

  const UpdateUser = (variables: IUpdateForm) => {
    saveUser({variables: { ...variables, ...{ id: user.id} }});
  };

  const CreateWorkspace = (input: IWorkspaceCreateForm) => {
    addWorkspace({ variables: {input} });
  };

  React.useLayoutEffect(() => {
    if (workspace?.id) {
      dispatch({type: ACTIONS.WORKSPACE_ADDED, payload: {workspace}});
    }
  }, [workspace]);

  React.useLayoutEffect(() => {
    if (data?.user) {
      dispatch({type: ACTIONS.USER_UPDATED, payload: data});
    }
  }, [data?.user]);

  return (
    <ContainerPage title={`${user?.firstName} ${user?.lastName}`} className="account">
      <Grid>
        <GridCell colSpan={8}>
          <Text type="headline-6" style={{margin: "0 0 2rem 0"}}>Edit account</Text>
          <UserUpdate
            onSubmit={(variables: IUpdateForm) => {UpdateUser(variables); }}
            user={user}
            loading={loading}/>
        </GridCell>
        <GridCell colSpan={4}>
          <Text type="headline-6" style={{margin: "0 0 2rem 0"}}>Create workspace</Text>
          <WorkSpaceCreate onCreate={(s: IWorkspaceCreateForm) => { CreateWorkspace(s); }} />
        </GridCell>
      </Grid>
    </ContainerPage>);
};

export default Account;
