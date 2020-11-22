import { useQuery } from "@apollo/react-hooks";
import { ApolloConnection } from "@appchat/core/apollo";
import { NavigationPathsSecurity } from "@appchat/core/navigation/constants";
import {INavigationPathsSecurity} from "@appchat/core/navigation/types";
import {ACTIONS} from "@appchat/core/store/constants";
import { GET_ME } from "@appchat/data/user/queries";
import {LoaderLinearProgress} from "@appchat/ui/elements/loader";
import {NavigationInterface} from "@appchat/ui/templates/navigation/drawer";
import * as React from "react";
import {useDispatch} from "react-redux";

const App = () => {
    const { data, refetch, loading } = useQuery(GET_ME, {notifyOnNetworkStatusChange: false, partialRefetch: true});
    const dispatch = useDispatch();

    React.useEffect( () => {
        if (data && typeof data?.user !== "undefined") {
            dispatch({type: data.user ? ACTIONS.USER_LOGIN : ACTIONS.USER_LOGOUT, payload: data});
        }
    }, [data]);

    React.useEffect(() => {
        if (
            ApolloConnection.history.action === "PUSH" &&
            NavigationPathsSecurity[ApolloConnection.history.location.pathname as keyof INavigationPathsSecurity ] &&
            !loading
        ) {
            refetch().catch( (e) => { console.debug("Refetch error", e); });
        }
    }, [ApolloConnection.history.location.pathname]);

    return loading ? <LoaderLinearProgress /> : <NavigationInterface />;
};

export { App };
