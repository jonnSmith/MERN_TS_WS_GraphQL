import * as React from "react";
import { FontIcon, ListItem } from "react-md";
import { Link as RouterLink, Route } from "react-router-dom";

const NavigationLink = (props) => {
  const { label, to, exact, icon, auth, action, filename } = props;
  let leftIcon;
  if (icon) {
    leftIcon = <FontIcon>{icon}</FontIcon>;
  }
  return (
    <Route path={to} exact={exact}>
    {({match}) => {
      return (
        <ListItem
          component={RouterLink}
          active={!!match}
          to={to}
          primaryText={label}
          leftIcon={leftIcon}
        />
      );

    }}
  </Route>);
};

export { NavigationLink };
