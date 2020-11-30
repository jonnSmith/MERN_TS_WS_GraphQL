import {ApolloConnection} from "@appchat/core/apollo";
import {ROUTES} from "@appchat/core/navigation/enums";
import {INavigationData} from "@appchat/core/navigation/interfaces";
import * as React from "react";
import {FontIcon, ListItem} from "react-md";
import {Link as RouterLink} from "react-router-dom";

const NavigationLink = (props: INavigationData) => {
  const { label, exact, icon, id, active } = props;
  const path = ROUTES[id as keyof typeof ROUTES];
  return (
    <ListItem
      component={RouterLink}
      active={ApolloConnection.history.location.pathname === path}
      exact={`${exact}`}
      to={path}
      primaryText={label}
      leftIcon={icon ? (<FontIcon>{icon}</FontIcon>) : null}
    />
  );
};

export { NavigationLink };
