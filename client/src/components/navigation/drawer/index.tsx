import * as React from "react";
import NavigationDrawer from "react-md/lib/NavigationDrawers";
import { Route, Router, Switch } from "react-router-dom";
import config from "../../../../../configs/config.app";
import { NavigationData } from "../../../misc/constants/navigation";
import { ROUTES } from "../../../misc/enums/routes";
import { NavigationLink } from "../link";

const NavigationItems = () => {
    const Navigations: Array<React.ReactElement<any>> = [];
    const Routers: Array<React.ReactElement<any>> = [];
    NavigationData.forEach((props) => {
        Navigations.push(
            (<NavigationLink {...props} key={props.to} />)
        );
        Routers.push(
            (<Route
                exact={props.exact || false}
                path={props.to}
                key={props.filename}
                component={ React.lazy(() => import(`../../../pages/${props.filename}`)) }
            />));
       });
    return { Navigations, Routers };
};

const NavigationInterface = () => {
    // @ts-ignore
    const { Navigations, Routers } = NavigationItems();
    return <NavigationDrawer
        drawerTitle={config.app.sidebar}
        toolbarTitle={config.app.name}
        mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY_MINI}
        tabletDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
        desktopDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
        navItems={Navigations}
    >
        <Switch>
            {Routers}
        </Switch>
    </NavigationDrawer>;
};

export { NavigationInterface };
