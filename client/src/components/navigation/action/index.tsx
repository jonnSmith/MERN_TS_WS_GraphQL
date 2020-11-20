import * as React from "react";
import { FontIcon, ListItem } from "react-md";
import { useDispatch } from "react-redux";
import { ACTIONS } from "../../../misc/constants/store";

const NavigationAction = (props) => {
    const { label, icon, id, payload } = props;
    const type = ACTIONS[id];
    const dispatch = useDispatch();
    return (
        <ListItem
            onClick={() => { dispatch({type, payload}); }}
            primaryText={label}
            leftIcon={icon ? (<FontIcon>{icon}</FontIcon>) : null}
        />
    );
};

export { NavigationAction as default };
