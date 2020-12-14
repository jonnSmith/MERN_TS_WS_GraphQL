import {ConfigSettings} from "@appchat/core/config";
import {CoreNavigation} from "@appchat/core/navigation";
import {IContainerLayoutProps} from "@appchat/ui/containers/interfaces";
import {UserOnlineSheet} from "@appchat/ui/templates/user/sheet";
import {Layout, LayoutNavigationItem, LayoutNavigationTree, useLayoutNavigation} from "@react-md/layout";
import {Configuration} from "@react-md/layout";
import * as React from "react";
import {Link, useLocation} from "react-router-dom";

const LayoutContainer = (props: IContainerLayoutProps): React.ReactElement => {
  const {children, user} = props;
  const {pathname} = useLocation();

  const [navs, setNavs] = React.useState(CoreNavigation.navs(!!user?.email));

  React.useEffect(() => {
    setNavs(CoreNavigation.navs(!!user?.email));
    // console.debug("navs", CoreNavigation.navs(!!user?.token));
    return () => {};
  }, [user?.email]);

  return <Configuration disableRipple={true} disableProgrammaticRipple={true}>
    <Layout
      title={ConfigSettings.app.name}
      navHeaderTitle={ConfigSettings.app.sidebar}
      navHeaderProps={{className: "rmd-app-bar--secondary"}}
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

export {LayoutContainer};
