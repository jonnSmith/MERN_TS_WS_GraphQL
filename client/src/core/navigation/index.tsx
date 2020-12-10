import {INavigationData, NavigationData} from "@appchat/core/navigation/constants";
import {ROUTES} from "@appchat/core/navigation/enums";
import {ActionButton} from "@appchat/ui/elements/action";
import * as Pages from "@appchat/ui/pages";
import {FontIcon} from "@react-md/icon";
import {LayoutNavigationItem, LayoutNavigationTree} from "@react-md/layout";
import {Text} from "@react-md/typography";
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
    if (item.payload || item.mutation) {
      NavItem.children = <ActionButton
        style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%"}}
        query={item.query}
        mutation={item.mutation}
        label={item.label}
        id={item.id}
        payload={item.payload} />;
      NavItem.contentComponent = Text,
      NavItem.leftAddon = (<FontIcon>{item.icon}</FontIcon>);
      NavItem.itemId = `${item.id.toLowerCase()}`;
      NavItem.parentId = null;
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
    const path = (nav.payload || nav.mutation) ? nav.id.toLowerCase() : ROUTES[nav.id as keyof typeof ROUTES];
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
