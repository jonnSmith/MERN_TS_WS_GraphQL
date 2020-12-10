import {useMutation} from "@apollo/react-hooks";
import {ACTIONS} from "@appchat/core/store/constants";
import {StateReturnTypes} from "@appchat/core/store/types";
import {UPDATE_USER} from "@appchat/data/user/queries";
import {ContainerPage} from "@appchat/ui/containers/page";
import {IUpdateForm} from "@appchat/ui/templates/user/interfaces";
import {UserUpdate} from "@appchat/ui/templates/user/update";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";

const Account = () => {
  const {user} = useSelector((state: StateReturnTypes) => state.UserReducer);
  const dispatch = useDispatch();
  const [saveUser, {data, loading}] = useMutation(UPDATE_USER);

  const UpdateUser = (variables: IUpdateForm) => {
    saveUser({variables: { ...variables, ...{ id: user.id} }});
  };

  React.useLayoutEffect(() => {
    if (data?.user) {
      dispatch({type: ACTIONS.USER_UPDATED, payload: data});
    }
  }, [data?.user]);

  return (
    <ContainerPage title={`${user?.firstName} ${user?.lastName}`} className="account">
      {user && <UserUpdate onSubmit={(variables: IUpdateForm) => {
        UpdateUser(variables);
      }} user={user} loading={loading}/>}
    </ContainerPage>);
};

export default Account;


