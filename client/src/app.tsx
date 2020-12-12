import {useMutation, useSubscription} from "@apollo/react-hooks";
import {ApolloConnection} from "@appchat/core/apollo";
import {ACTIONS} from "@appchat/core/store/constants";
import {StateReturnTypes} from "@appchat/core/store/types";
import {CHAT_UPDATED} from "@appchat/data/message/queries";
import {ONLINE_USERS, SIGN_OUT} from "@appchat/data/user/queries";
import {WORKSPACE_LIST} from "@appchat/data/workspace/queries";
import {LayoutContainer} from "@appchat/ui/containers/layout";
import {RouterSwitch} from "@appchat/ui/containers/switch";
import {LoaderOverlay} from "@appchat/ui/elements/loader";
import {ConnectedRouter} from "connected-react-router";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";

const App = () => {

  const { user } = useSelector((state: StateReturnTypes) => state.UserReducer);
  const { action: loaded } = useSelector((state: StateReturnTypes) => state.WorkspaceReducer);

  const [signOut, {loading: unloading}] = useMutation(SIGN_OUT);

  const {data: users, loading: uloading} = useSubscription(ONLINE_USERS);
  const {data: chat, loading: cloading} = useSubscription(CHAT_UPDATED);
  const {data: workspace, loading: wloading} = useSubscription(WORKSPACE_LIST);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (chat && !cloading) {
      // console.debug("chat", chat);
      dispatch({type: ACTIONS.MESSAGE_ADDED, payload: {message: chat?.chatUpdated?.message}});
    }
    return () => {};
  }, [chat?.chatUpdated, cloading]);

  React.useEffect(() => {
    if (users && !uloading) {
      // console.debug("users", users);
      dispatch({type: ACTIONS.ONLINE_CHANGED, payload: {list: users?.onlineUsers?.list}});
    }
    return () => {};
  }, [users?.onlineUsers, uloading]);

  React.useEffect(() => {
    if (workspace && !wloading) {
      // console.debug("workspaces", workspace);
      dispatch({type: ACTIONS.WORKSPACES_CHANGED, payload: {list: workspace?.workspaceList?.list}});
    }
    return () => {};
  }, [workspace?.workspaceList, wloading]);

  const logout = (ev: BeforeUnloadEvent) => {
    if (user?.email && !unloading) { signOut({variables: {email: user?.email}}); }
  };
  window.onbeforeunload = (loaded && user?.email) ? logout : null;

  return <ConnectedRouter history={ApolloConnection.history}>
      <LayoutContainer loaded={!!loaded} user={user} ><RouterSwitch user={user}/></LayoutContainer>
      {!loaded && <LoaderOverlay />}
    </ConnectedRouter>;
};

export {App};
