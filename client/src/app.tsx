import { useQuery } from "@apollo/react-hooks";
import {ACTIONS} from "@appchat/core/store/constants";
import {GET_ME} from "@appchat/data/user/queries";
import {LoaderSpinner} from "@appchat/ui/elements/loader";
import {NavigationInterface} from "@appchat/ui/templates/navigation/drawer";
import * as React from "react";
import {useDispatch} from "react-redux";

const App = () => {
    const { data, loading, error } = useQuery(GET_ME, {notifyOnNetworkStatusChange: true});
    const dispatch = useDispatch();

    React.useEffect( () => {
        if (data && typeof data?.user !== "undefined") {
            dispatch({type: data.user ? ACTIONS.USER_LOGIN : ACTIONS.USER_LOGOUT, payload: data});
        }
    }, [data]);
    if (error) { return <><p>Critical error: {JSON.stringify(error)} </p><a href="/login">Reload</a> </>; }
    return loading ? <LoaderSpinner /> : <NavigationInterface />;
};

export { App };
