import {useMutation, useSubscription} from "@apollo/react-hooks";
import {ApolloConnection} from "@appchat/core/apollo";
import {ACTIONS} from "@appchat/core/store/constants";
import {StateReturnTypes} from "@appchat/core/store/types";
import {CHAT_UPDATED} from "@appchat/data/message/queries";
import {ONLINE_USERS, SIGN_OUT} from "@appchat/data/user/queries";
import {LayoutContainer} from "@appchat/ui/containers/layout";
import {RouterSwitch} from "@appchat/ui/containers/switch";
import {LoaderOverlay} from "@appchat/ui/elements/loader";
import {ConnectedRouter} from "connected-react-router";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";

const App = () => {

  const { user, action } = useSelector((state: StateReturnTypes) => state.UserReducer);

  const [signOut, {loading: unloading}] = useMutation(SIGN_OUT);

  const {data: online, loading: refreshing} = useSubscription(ONLINE_USERS);
  const {data: updated, loading: updating} = useSubscription(CHAT_UPDATED);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (updated && !updating) {
      console.debug("updated", updated);
      dispatch({type: ACTIONS.MESSAGE_ADDED, payload: {message: updated?.chatUpdated?.message}});
    }
  }, [updated?.chatUpdated, updating]);

  React.useEffect(() => {
    if (online && !refreshing) {
      // console.debug("online", online);
      dispatch({type: ACTIONS.ONLINE_CHANGED, payload: {list: online?.onlineUsers?.list}});
    }
  }, [online?.onlineUsers, refreshing]);

  window.onunload = async (event: Event) => {
    await signOut({variables: {email: user?.email}});
    dispatch({type: ACTIONS.USER_LOGOUT, payload: { user: null }});
  };

  return <ConnectedRouter history={ApolloConnection.history}>
      <LayoutContainer loaded={!!action} user={user} ><RouterSwitch user={user}/></LayoutContainer>
      {!action && <LoaderOverlay />}
    </ConnectedRouter>;
};

export {App};
