import {useSubscription} from "@apollo/react-hooks";
import {ApolloConnection} from "@appchat/core/apollo";
import {ACTIONS} from "@appchat/core/store/constants";
import {StateReturnTypes} from "@appchat/core/store/types";
import {CHAT_UPDATED} from "@appchat/data/message/queries";
import {ONLINE_USERS} from "@appchat/data/user/queries";
import {LayoutContainer} from "@appchat/ui/containers/layout";
import {RouterSwitch} from "@appchat/ui/containers/switch";
import {ConnectedRouter} from "connected-react-router";
import * as React from "react";
import {useEffect} from "react";
import {useDispatch, useSelector, useStore} from "react-redux";

const App = () => {

  const { user, action } = useSelector((state: StateReturnTypes) => state.UserReducer);
  const [loaded, setLoaded] = React.useState(false);

  useEffect(() => {
    console.debug(action);
  }, [action]);

  const {data: online, loading: refreshing} = useSubscription(ONLINE_USERS);
  const {data: updated, loading: updating} = useSubscription(CHAT_UPDATED);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (updated && !updating) {
      console.debug("updated", updated);
      dispatch({type: ACTIONS.MESSAGE_ADDED, payload: {message: updated.chatUpdated.message}});
    }
  }, [updated?.chatUpdated, updating]);

  React.useEffect(() => {
    if (online && !refreshing) {
      console.debug("online", online);
      dispatch({type: ACTIONS.ONLINE_CHANGED, payload: {list: online?.onlineUsers?.list}});
    }
  }, [online?.onlineUsers, refreshing]);

  return <ConnectedRouter history={ApolloConnection.history}>
    <LayoutContainer user={user} ><RouterSwitch/></LayoutContainer>
    </ConnectedRouter>;
};

export {App};
