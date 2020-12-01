import {INavigationData, NavigationData} from "@appchat/core/navigation/constants";
import {ROUTES} from "@appchat/core/navigation/enums";
import { NavigationAction } from "@appchat/ui/elements/navigation/action";
import { NavigationLink } from "@appchat/ui/elements/navigation/link";
import * as Pages from "@appchat/ui/pages";
import * as React from "react";
import {Route} from "react-router-dom";

class CoreNavigation {

    public static links(auth: boolean) {
        if (!CoreNavigation.NavigationLinks.length) { new CoreNavigation(); }
        return CoreNavigation.NavigationLinks.filter( (l) => l.props.auth && auth || !l.props.auth && !auth);
    }

    public static routes(auth: boolean) {
        if (!CoreNavigation.NavigationRoutes.length) { new CoreNavigation(); }
        return CoreNavigation.NavigationRoutes.filter( (r) => r.props.auth && auth || !r.props.auth && !auth);
    }

    private static NavigationLinks: Array<React.ReactElement<any>> = [];
    private static NavigationRoutes: Array<React.ReactElement<any>> = [];

    private constructor() {
        CoreNavigation.NavigationLinks =
            CoreNavigation.NavigationLinks.length ?
                CoreNavigation.NavigationLinks : [...NavigationData].map( (props) => {
                    const NavigationItem = props.payload ?
                        NavigationAction :
                        NavigationLink ;
                    return (<NavigationItem {...props} key={props.id}  />);
                });

        CoreNavigation.NavigationRoutes =
            CoreNavigation.NavigationRoutes.length ?
                CoreNavigation.NavigationRoutes : [...NavigationData]
                    .filter((n) => !n.payload)
                    .map( (props: INavigationData) => {
                        const RouteComponent = Pages[props.id as keyof typeof ROUTES];
                        return (<Route
                            exact={props.exact || false}
                            path={ROUTES[props.id as keyof typeof ROUTES]}
                            key={props.id}
                            auth={props.auth}
                            render={ () => <RouteComponent /> }
                        />);
                    });
    }
}

export { CoreNavigation };
