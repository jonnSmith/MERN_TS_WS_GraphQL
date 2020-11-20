import * as React from "react";
import {Route} from "react-router-dom";
import { NavigationData } from "../../constants/navigation";
import { ROUTES } from "../../enums/routes";

class Navigation {

    public static links(auth) {
        // tslint:disable-next-line:no-unused-expression
        if (!Navigation.NavigationLinks.length) { new Navigation(); }
        return Navigation.NavigationLinks.filter(
            (link) => link.props.auth && auth || !link.props.auth && !auth ? link : null
        );
    }

    public static routes(auth) {
        // tslint:disable-next-line:no-unused-expression
        if (!Navigation.NavigationRoutes.length) { new Navigation(); }
        return Navigation.NavigationRoutes.filter(
            (route) => route.props.auth && auth || !route.props.auth && !auth ? route : null
        );
    }

    private static NavigationLinks: Array<React.ReactElement<any>> = [];
    private static NavigationRoutes: Array<React.ReactElement<any>> = [];

    private constructor() {
        Navigation.NavigationLinks =
            Navigation.NavigationLinks.length ?
            Navigation.NavigationLinks : [...NavigationData].map( (props) => {
                const NavigationLink = React.lazy(() => import("../../../components/navigation/link") );
                return (<NavigationLink {...props} key={props.id} />);
            }
        );

        Navigation.NavigationRoutes =
            Navigation.NavigationRoutes.length ?
            Navigation.NavigationRoutes : [...NavigationData].map( (props) => {
                const RouteComponent = React.lazy(() => import(`../../../pages/${props.id}/`));
                return (<Route
                    exact={props.exact || false}
                    path={ROUTES[props.id]}
                    key={props.id}
                    auth={props.auth}
                    render={ () => <RouteComponent /> }
                />);
            }
        );
    }
}

export { Navigation };
