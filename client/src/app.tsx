import {useQuery} from "@apollo/react-hooks";
import {ApolloConnection} from "@appchat/core/apollo";
import {ACTIONS} from "@appchat/core/store/constants";
import {GET_ME} from "@appchat/data/user/queries";
import {LayoutContainer} from "@appchat/ui/containers/layout";
import {RouterSwitch} from "@appchat/ui/containers/switch";
import {ConnectedRouter} from "connected-react-router";
import * as React from "react";
import {useDispatch} from "react-redux";

const App = () => {

  const {data, loading, error} = useQuery(GET_ME, {notifyOnNetworkStatusChange: true});
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (data && typeof data?.user !== "undefined" && !loading) {
      dispatch({type: data.user ? ACTIONS.USER_LOGIN : ACTIONS.USER_LOGOUT, payload: data});
    }
    return (): void => {
    };
  }, [data, loading]);

  if (error) {
    return <><p>Critical error: {JSON.stringify(error)} </p><a href="/">Reload</a> </>;
  }

  return <ConnectedRouter history={ApolloConnection.history}>
      {!loading && <LayoutContainer><RouterSwitch /></LayoutContainer>}
    </ConnectedRouter>;
};

export {App};
