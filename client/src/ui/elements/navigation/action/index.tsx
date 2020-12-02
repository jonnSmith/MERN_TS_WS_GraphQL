import {INavigationData} from "@appchat/core/navigation/interfaces";
import {ACTIONS} from "@appchat/core/store/constants";
import {Button} from "@react-md/button";
import {FontIcon} from "@react-md/icon";
import * as React from "react";
import {useDispatch} from "react-redux";

const NavigationAction = (props: INavigationData) => {
    const { label, icon, id, payload } = props;
    const type = ACTIONS[id as keyof typeof ACTIONS];
    const dispatch = useDispatch();
    return (
        <Button
            disableProgrammaticRipple disableRipple rippleTimeout={0} rippleClassNames=""
            onMouseDown={() => { dispatch({type, payload}); }}><FontIcon>{icon}</FontIcon> {label}</Button>
    );
};

export { NavigationAction };
