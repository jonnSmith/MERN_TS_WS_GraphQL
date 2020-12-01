import {ApolloConnection} from "@appchat/core/apollo";
import {ROUTES} from "@appchat/core/navigation/enums";
import {INavigationData} from "@appchat/core/navigation/interfaces";
import * as React from "react";
import {FontIcon, ListItem} from "react-md";
import {Link as RouterLink} from "react-router-dom";

const NavigationLink = (props: INavigationData) => {
  const { label, exact, icon, id, active } = props;
  const path = ROUTES[id as keyof typeof ROUTES];
  // const navLinkRef = React.useRef();

  // React.useEffect(() => {
  //   let timeout: NodeJS.Timeout;
  //   timeout = setTimeout(() => {
  //     if (navLinkRef?.current?.props?.active) { navLinkRef?.current?.focus(); }
  //   }, 300);
  //   return () => {
  //     clearTimeout(timeout);
  //   };
  // }, [navLinkRef]);

  return (
    <ListItem
      component={RouterLink}
      active={ApolloConnection.history.location.pathname === path}
      exact={`${exact}`}
      to={path}
      // ref={navLinkRef}
      primaryText={label}
      leftIcon={icon ? (<FontIcon>{icon}</FontIcon>) : null}
    />
  );
};

export { NavigationLink };
