import {CoreNavigation} from "@appchat/core/navigation";
import {ISwitchRouterProps} from "@appchat/ui/containers/interfaces";
import * as React from "react";
import {Switch} from "react-router-dom";

const RouterSwitch = (props: ISwitchRouterProps) => {
  const { user } = props;
  const [routes, setRoutes] = React.useState(CoreNavigation.pages(!!user?.token));
  React.useEffect(() => {
    setRoutes(CoreNavigation.pages(!!user?.token));
    // console.debug("navs", CoreNavigation.navs(!!user?.token));
    return () => {};
  }, [user?.token]);

  return <Switch>
    {routes}
  </Switch>;
};

export {RouterSwitch};
