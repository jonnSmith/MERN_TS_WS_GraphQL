import {config} from "@appchat/core/config";
import {CoreNavigation} from "@appchat/core/navigation";
import {StateReturnTypes} from "@appchat/core/store/types";
import * as React from "react";
import NavigationDrawer from "react-md/lib/NavigationDrawers";
import {useSelector} from "react-redux";
import {Switch} from "react-router-dom";

const NavigationInterface = () => {
    const {user} = useSelector((state: StateReturnTypes) => state.UserReducer);
    return <NavigationDrawer
        drawerTitle={config.app.sidebar}
        toolbarTitle={config.app.name}
        mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY_MINI}
        tabletDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
        desktopDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
        navItems={ CoreNavigation.links(typeof user?.token !== "undefined") }
    >
        <Switch>
            {CoreNavigation.routes(typeof user?.token !== "undefined")}
        </Switch>
    </NavigationDrawer>;
};

export { NavigationInterface };
