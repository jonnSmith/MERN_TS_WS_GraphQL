import { ConfigSettings } from "@appchat/core/config";
import { CoreNavigation } from "@appchat/core/navigation";
import { IContainerLayoutProps } from "@appchat/ui/containers/interfaces";
import { UserOnlineSheet } from "@appchat/ui/templates/user/sheet";
import { Layout, LayoutNavigationItem, LayoutNavigationTree, useLayoutNavigation } from "@react-md/layout";
import { Configuration } from "@react-md/layout";
import * as React from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { ROUTES } from "@appchat/core/navigation/enums";

const LayoutContainer = (props: IContainerLayoutProps): React.ReactElement => {
  const { children, user } = props;
  const { pathname } = useLocation();
  const history = useHistory();

  const [navs, setNavs] = React.useState(CoreNavigation.navs(!!user?.email));

  React.useEffect(() => {
    setNavs(CoreNavigation.navs(!!user?.email));
    // console.debug("navs", CoreNavigation.navs(!!user?.token));
    return () => { };
  }, [user?.email]);

  /**
   * Redirect to account page for user without workspace
   */
  React.useEffect(() => {
    if (pathname !== ROUTES.Account && !!user?.email && !user?.workspaceId) {
      console.debug(pathname, !!user.email && !user.workspaceId);
      history.push(ROUTES.Account);
    }
    return () => { };
  }, [user?.workspaceId, user?.email, pathname]);

  return <Configuration disableRipple={true} disableProgrammaticRipple={true}>
    <Layout
      title={ConfigSettings.app.name}
      navHeaderTitle={ConfigSettings.app.sidebar}
      navHeaderProps={{ className: "rmd-app-bar--secondary" }}
      treeProps={useLayoutNavigation(
        navs as LayoutNavigationTree<LayoutNavigationItem>,
        pathname,
        Link)}
    >
      {children}
    </Layout>
    {!!user?.email && <UserOnlineSheet position={"right"} />}
  </Configuration >;
};

export { LayoutContainer };
