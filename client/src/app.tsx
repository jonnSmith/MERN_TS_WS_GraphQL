import { useQuery } from "@apollo/react-hooks";
import * as React from "react";
import { useDispatch } from "react-redux";
import { NavigationInterface } from "./components/navigation/drawer";
import { GET_ME } from "./gql/queries/user";
import {ACTIONS} from "./misc/constants/store";

const App = () => {
    const { data, loading, refetch } = useQuery(GET_ME);
    const dispatch = useDispatch();

    React.useEffect( () => {
        if (data && typeof data?.user !== "undefined") {
            dispatch({type: data.user ? ACTIONS.USER_LOGIN : ACTIONS.USER_LOGOUT, payload: data.user});
        }
    }, [data]);

    if (loading) { return <p>Still loading...</p>; }

    return <NavigationInterface />;
};

export { App };
