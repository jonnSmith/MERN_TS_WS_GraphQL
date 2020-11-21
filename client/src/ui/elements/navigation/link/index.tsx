import {ApolloConnection} from "core/apollo";
import {ROUTES} from "core/navigation/enums";
import * as React from "react";
import {FontIcon, ListItem} from "react-md";
import {Link as RouterLink} from "react-router-dom";

const NavigationLink = (props) => {
  const { label, exact, icon, id, active } = props;
  const path = ROUTES[id];
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

export { NavigationLink as default };
