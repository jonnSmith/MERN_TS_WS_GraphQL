import {ConfigSettings} from "@appchat/core/config";
import {CoreNavigation} from "@appchat/core/navigation";
import {StateReturnTypes} from "@appchat/core/store/types";
import {IContainerLayoutProps} from "@appchat/ui/containers/interfaces";
import {Layout, useLayoutNavigation} from "@react-md/layout";
import {Configuration} from "@react-md/layout";
import * as React from "react";
import {useSelector} from "react-redux";
import {Link, useLocation} from "react-router-dom";

const LayoutContainer = (props: IContainerLayoutProps): React.ReactElement => {
  const {children} = props;
  const {pathname} = useLocation();
  const user = useSelector((state: StateReturnTypes) => state.UserReducer.user);

  return <Configuration disableRipple={true} disableProgrammaticRipple={true}>
    <Layout
      title={ConfigSettings.app.name}
      navHeaderTitle={ConfigSettings.app.sidebar}
      navHeaderProps={{className: "rmd-app-bar--secondary", }}
      // @ts-ignore
      treeProps={useLayoutNavigation(CoreNavigation.navs(!!user?.token), pathname, Link)}
    >
      {children}
    </Layout>
  </Configuration > ;
};

export {LayoutContainer};
