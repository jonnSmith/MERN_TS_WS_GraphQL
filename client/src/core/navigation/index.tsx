import {INavigationData, NavigationData} from "@appchat/core/navigation/constants";
import {ROUTES} from "@appchat/core/navigation/enums";
import {NavigationAction} from "@appchat/ui/elements/navigation/action";
import * as Pages from "@appchat/ui/pages";
import {FontIcon} from "@react-md/icon";
import {LayoutNavigationItem, LayoutNavigationTree} from "@react-md/layout";
import * as React from "react";
import {Route} from "react-router-dom";

class CoreNavigation {

  public static navs(auth: boolean) {
    if (!CoreNavigation.NavigationPrivateNavs || !CoreNavigation.NavigationPublicNavs) {
      new CoreNavigation();
    }
    return auth ? CoreNavigation.NavigationPrivateNavs : CoreNavigation.NavigationPublicNavs;
  }

  public static pages(auth: boolean) {
    if (!CoreNavigation.NavigationPrivatePages || !CoreNavigation.NavigationPublicPages) {
      new CoreNavigation();
    }
    return auth ? CoreNavigation.NavigationPrivatePages : CoreNavigation.NavigationPublicPages;
  }

  private static NavigationPublicNavs: LayoutNavigationTree<LayoutNavigationItem> | INavigationData;
  private static NavigationPrivateNavs: LayoutNavigationTree<LayoutNavigationItem> | INavigationData;

  private static NavigationPublicPages: React.ReactElement[];
  private static NavigationPrivatePages: React.ReactElement[];

  private static CreateNavItem = (item: INavigationData) => {
    const path = ROUTES[item.id as keyof typeof ROUTES];
    const NavItem: LayoutNavigationItem = {
      children: item.label,
      itemId: path,
      leftAddon: <FontIcon>{item.icon}</FontIcon>,
      parentId: null,
      to: path,
    };
    if (item.payload) {
      NavItem.children = <NavigationAction
        style={{marginLeft: "-15px"}}
        label={item.label}
        id={item.id}
        payload={item.payload} />;
      NavItem.leftAddon = (<FontIcon color={"deep-purple-500"}>{item.icon}</FontIcon>);
      NavItem.itemId = null;
      NavItem.to = null;
      NavItem.isCustom = true;
    }
    return NavItem;
  }

  private static navsReducer = (res: any, nav: INavigationData, i: number) => {
    if (i === 1) {
      const FirstPath = ROUTES[res.id as keyof typeof ROUTES];
      const FirstNav = CoreNavigation.CreateNavItem(res);
      res = {};
      res[FirstPath] = FirstNav;
    }
    const path = ROUTES[nav.id as keyof typeof ROUTES];
    res[path] = CoreNavigation.CreateNavItem(nav);
    return res;
  }

  private static routesGenerator = (props: INavigationData) => {
    const RouteComponent = Pages[props.id as keyof typeof ROUTES];
    return <Route
      exact={props.exact || false}
      path={ROUTES[props.id as keyof typeof ROUTES]}
      key={props.id}
      component={RouteComponent}
    />;
  }

  private constructor() {
    // tslint:disable-next-line:max-line-length
    CoreNavigation.NavigationPrivateNavs = CoreNavigation.NavigationPrivateNavs || [...NavigationData].filter((n) => n.auth).reduce(
        (result: any, item, index) => CoreNavigation.navsReducer(result, item, index));

    // tslint:disable-next-line:max-line-length
    CoreNavigation.NavigationPublicNavs = CoreNavigation.NavigationPublicNavs || [...NavigationData].filter((n) => !n.auth).reduce(
      (result: any, item, index, array) => CoreNavigation.navsReducer(result, item, index) );

    CoreNavigation.NavigationPublicPages = [...NavigationData]
      .filter((n) => !n.payload)
      .filter((n) => !n.auth)
      .map((props: INavigationData) => CoreNavigation.routesGenerator(props));

    CoreNavigation.NavigationPrivatePages = [...NavigationData]
      .filter((n) => !n.payload)
      .filter((n) => n.auth)
      .map((props: INavigationData) => CoreNavigation.routesGenerator(props));
  }
}

export {CoreNavigation};
