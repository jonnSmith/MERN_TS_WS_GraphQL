import {CoreNavigation} from "@appchat/core/navigation";
import {ISwitchRouterProps} from "@appchat/ui/containers/interfaces";
import * as React from "react";
import {Switch} from "react-router-dom";

const RouterSwitch = (props: ISwitchRouterProps) => {
  const { user } = props;
  const [routes, setRoutes] = React.useState(CoreNavigation.pages(!!user?.email));
  React.useEffect(() => {
    setRoutes(CoreNavigation.pages(!!user?.email));
    // console.debug("navs", CoreNavigation.navs(!!user?.token));
    return () => {};
  }, [user?.email]);

  return <Switch>
    {routes}
  </Switch>;
};

export {RouterSwitch};
