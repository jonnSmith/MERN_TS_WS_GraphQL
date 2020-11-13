import { useQuery } from "@apollo/react-hooks";
import * as React from "react";
import { NavigationInterface } from "./components/navigation/drawer";
import { GET_ME } from "./gql/queries/user";

const App = () => {
    const { data, loading, error } = useQuery(GET_ME);

    if (loading) { return <p>Still loading..</p>; }
    if (error) { return <p>There is an error!</p>; }

    return <NavigationInterface />;
};

export { App };
