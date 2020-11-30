import {INavigationData} from "@appchat/core/navigation/interfaces";
import {ACTIONS} from "@appchat/core/store/constants";
import * as React from "react";
import {FontIcon, ListItem} from "react-md";
import {useDispatch} from "react-redux";

const NavigationAction = (props: INavigationData) => {
    const { label, icon, id, payload } = props;
    const type = ACTIONS[id as keyof typeof ACTIONS];
    const dispatch = useDispatch();
    return (
        <ListItem
            onClick={() => { dispatch({type, payload}); }}
            primaryText={label}
            leftIcon={icon ? (<FontIcon>{icon}</FontIcon>) : null}
        />
    );
};

export { NavigationAction };
