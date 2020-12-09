import {useSubscription} from "@apollo/react-hooks";
import {ConfigSettings} from "@appchat/core/config";
import {CoreNavigation} from "@appchat/core/navigation";
import {ACTIONS} from "@appchat/core/store/constants";
import {StateReturnTypes} from "@appchat/core/store/types";
import {CHAT_UPDATED} from "@appchat/data/message/queries";
import {ONLINE_USERS} from "@appchat/data/user/queries";
import {IContainerLayoutProps} from "@appchat/ui/containers/interfaces";
import {Layout, LayoutNavigationItem, LayoutNavigationTree, useLayoutNavigation} from "@react-md/layout";
import {Configuration} from "@react-md/layout";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useLocation} from "react-router-dom";

const LayoutContainer = (props: IContainerLayoutProps): React.ReactElement => {
  const {children, user} = props;
  const {pathname} = useLocation();

  return <Configuration disableRipple={true} disableProgrammaticRipple={true}>
    <Layout
      title={ConfigSettings.app.name}
      navHeaderTitle={ConfigSettings.app.sidebar}
      navHeaderProps={{className: "rmd-app-bar--secondary"}}
      treeProps={useLayoutNavigation(
          CoreNavigation.navs(!!user?.token) as LayoutNavigationTree<LayoutNavigationItem>,
          pathname,
          Link)}
    >
      {children}
    </Layout>
  </Configuration >;
};

export {LayoutContainer};
