import {NavigationData} from "core/navigation/constants";
import {ROUTES} from "core/navigation/enums";
import {ACTIONS} from "core/store/constants";
import * as React from "react";
import {ReactElement} from "react";
import {Route} from "react-router-dom";

class CoreNavigation {

    public static links(auth) {
        // tslint:disable-next-line:no-unused-expression
        if (!CoreNavigation.NavigationLinks.length) { new CoreNavigation(); }
        return CoreNavigation.NavigationLinks.filter(
            (link) => link.props.auth && auth || !link.props.auth && !auth ? link : null
        );
    }

    public static routes(auth) {
        // tslint:disable-next-line:no-unused-expression
        if (!CoreNavigation.NavigationRoutes.length) { new CoreNavigation(); }
        return CoreNavigation.NavigationRoutes.filter(
            (route) => route.props.auth && auth || !route.props.auth && !auth ? route : null
        );
    }

    private static NavigationLinks: Array<React.ReactElement<any>> = [];
    private static NavigationRoutes: Array<React.ReactElement<any>> = [];

    private constructor() {
        CoreNavigation.NavigationLinks =
            CoreNavigation.NavigationLinks.length ?
                CoreNavigation.NavigationLinks : [...NavigationData].map( (props) => {
                    const NavigationLink = React.lazy(() => import("ui/elements/navigation/link") );
                    const NavigationAction = React.lazy(() => import("ui/elements/navigation/action") );
                    let link: ReactElement = null;
                    if (ROUTES[props.id]) { link = (<NavigationLink {...props} key={props.id} />); }
                    if (ACTIONS[props.id]) { link = (<NavigationAction {...props} key={props.id} />); }
                    return link;
                }
                );

        CoreNavigation.NavigationRoutes =
            CoreNavigation.NavigationRoutes.length ?
                CoreNavigation.NavigationRoutes : [...NavigationData].filter((n) => ROUTES[n.id]).map( (props) => {
                    const RouteComponent = React.lazy(() => import(`ui/pages/${props.id}/`));
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

export { CoreNavigation };
