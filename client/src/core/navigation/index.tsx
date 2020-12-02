import {INavigationData, NavigationData} from "@appchat/core/navigation/constants";
import {ROUTES} from "@appchat/core/navigation/enums";
import {NavigationAction} from "@appchat/ui/elements/navigation/action";
import {NavigationLink} from "@appchat/ui/elements/navigation/link";
import * as Pages from "@appchat/ui/pages";
import {FontIcon} from "@react-md/icon";
import {LayoutNavigationItem, LayoutNavigationTree} from "@react-md/layout";
import * as React from "react";
import {Route} from "react-router-dom";

class CoreNavigation {

  public static links(auth: boolean) {
    if (!CoreNavigation.NavigationLinks.length) {
      new CoreNavigation();
    }
    return CoreNavigation.NavigationLinks.filter((l) => l.props.auth && auth || !l.props.auth && !auth);
  }

  public static navs(auth: boolean) {
    if (!CoreNavigation.NavigationPrivateNavs || !CoreNavigation.NavigationPublicNavs) {
      new CoreNavigation();
    }
    return auth ? CoreNavigation.NavigationPrivateNavs : CoreNavigation.NavigationPublicNavs;
  }

  public static routes(auth: boolean) {
    if (!CoreNavigation.NavigationRoutes.length) {
      new CoreNavigation();
    }
    return CoreNavigation.NavigationRoutes.filter((r) => r.props.auth && auth || !r.props.auth && !auth);
  }

  public static pages(auth: boolean) {
    if (!CoreNavigation.NavigationRoutes.length) {
      new CoreNavigation();
    }
    return auth ? CoreNavigation.NavigationPrivatePages : CoreNavigation.NavigationPublicPages;
  }

  private static NavigationLinks: Array<React.ReactElement<any>> = [];
  private static NavigationRoutes: Array<React.ReactElement<any>> = [];

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
        label={item.label}
        id={item.id}
        icon={item.icon}
        payload={item.payload} />;
      NavItem.itemId = null;
      NavItem.to = null;
      NavItem.isCustom = true;
      NavItem.leftAddon = null;
    }
    return NavItem;
  }

  private constructor() {
    CoreNavigation.NavigationLinks =
      CoreNavigation.NavigationLinks.length ?
        CoreNavigation.NavigationLinks : [...NavigationData].map((props) => {
          const NavigationItem = props.payload ?
            NavigationAction :
            NavigationLink;
          return (<NavigationItem {...props} key={props.id}/>);
        });

    CoreNavigation.NavigationRoutes =
      CoreNavigation.NavigationRoutes.length ?
        CoreNavigation.NavigationRoutes : [...NavigationData]
          .filter((n) => !n.payload)
          .map((props: INavigationData) => {
            const path = props.id as keyof typeof ROUTES;
            const RouteComponent = Pages[path];
            return (<Route
              exact={props.exact || false}
              path={ROUTES[path]}
              key={path}
              auth={props.auth}
              sensitive={false}
              render={() => <RouteComponent/>}
            />);
          });
    // tslint:disable-next-line:max-line-length
    CoreNavigation.NavigationPrivateNavs = CoreNavigation.NavigationPrivateNavs || [...NavigationData].filter((n) => n.auth).reduce(
        (result: any, item, index) => {
          if (index === 1) {
            const FirstPath = ROUTES[result.id as keyof typeof ROUTES];
            const FirstNav = CoreNavigation.CreateNavItem(result);
            result = {};
            result[FirstPath] = FirstNav;
          }
          const path = ROUTES[item.id as keyof typeof ROUTES];
          result[path] = CoreNavigation.CreateNavItem(item);
          return result;
        });

    // tslint:disable-next-line:max-line-length
    CoreNavigation.NavigationPublicNavs = CoreNavigation.NavigationPublicNavs || [...NavigationData].filter((n) => !n.auth).reduce(
      (result: any, item, index, array) => {
        if (index === 1) {
          const FirstPath = ROUTES[result.id as keyof typeof ROUTES];
          const FirstNav = CoreNavigation.CreateNavItem(result);
          result = {};
          result[FirstPath] = FirstNav;
        }
        const path = ROUTES[item.id as keyof typeof ROUTES];
        result[path] = CoreNavigation.CreateNavItem(item);
        return result;
    });

    CoreNavigation.NavigationPublicPages = [...NavigationData]
      .filter((n) => !n.payload)
      .filter((n) => !n.auth)
      .map((props: INavigationData) => {
        const RouteComponent = Pages[props.id as keyof typeof ROUTES];
        return <Route
          exact={props.exact || false}
          path={ROUTES[props.id as keyof typeof ROUTES]}
          key={props.id}
          component={RouteComponent}
        />;
      });

    CoreNavigation.NavigationPrivatePages = [...NavigationData]
      .filter((n) => !n.payload)
      .filter((n) => n.auth)
      .map((props: INavigationData) => {
        const RouteComponent = Pages[props.id as keyof typeof ROUTES];
        return <Route
          exact={props.exact || false}
          path={ROUTES[props.id as keyof typeof ROUTES]}
          key={props.id}
          component={RouteComponent}
        />;
      });
  }
}

export {CoreNavigation};
