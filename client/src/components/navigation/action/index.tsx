import * as React from "react";
import { FontIcon, ListItem } from "react-md";
import { Link as RouterLink } from "react-router-dom";
import { ROUTES } from "../../../misc/enums/routes";

const NavigationAction = (props) => {
    const { label, exact, icon, id, payload } = props;
    const action = ROUTES[id];
    return (
        <ListItem
            component={RouterLink}
            exact={`${exact}`}
            onClick={() => {  }}
            primaryText={label}
            leftIcon={icon ? (<FontIcon>{icon}</FontIcon>) : null}
        />
    );
};

export { NavigationAction as default };
