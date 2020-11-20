import * as React from "react";
import NavigationDrawer from "react-md/lib/NavigationDrawers";
import { useSelector } from "react-redux";
import { Switch } from "react-router-dom";
import config from "../../../../../configs/config.app";
import { Navigation } from "../../../misc/helpers/navigation";
import { StateReturnTypes } from "../../../store/reducers/types";

const NavigationInterface = () => {
    const {user} = useSelector((state: StateReturnTypes) => state.UserReducer);
    return <NavigationDrawer
        drawerTitle={config.app.sidebar}
        toolbarTitle={config.app.name}
        mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY_MINI}
        tabletDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
        desktopDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
        navItems={Navigation.links(!!(user?.token))}
    >
        <Switch>
            {Navigation.routes(!!(user?.token))}
        </Switch>
    </NavigationDrawer>;
};

export { NavigationInterface };
