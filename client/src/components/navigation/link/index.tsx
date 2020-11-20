import * as React from "react";
import { FontIcon, ListItem } from "react-md";
import { Link as RouterLink } from "react-router-dom";
import { ROUTES } from "../../../misc/enums/routes";

const NavigationLink = (props) => {
  const { label, exact, icon, id } = props;
  const path = ROUTES[id];
  return (
    <ListItem
      component={RouterLink}
      exact={`${exact}`}
      to={path}
      primaryText={label}
      leftIcon={icon ? (<FontIcon>{icon}</FontIcon>) : null}
    />
  );
};

export { NavigationLink as default };
