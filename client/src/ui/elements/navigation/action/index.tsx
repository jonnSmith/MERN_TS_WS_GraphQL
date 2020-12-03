import {INavigationData} from "@appchat/core/navigation/interfaces";
import {ACTIONS} from "@appchat/core/store/constants";
import {Button} from "@react-md/button";
import {FontIcon, TextIconSpacing} from "@react-md/icon";
import * as React from "react";
import {useDispatch} from "react-redux";
import {CSSTransitionClassNames} from "react-transition-group/CSSTransition";

const NavigationAction = (props: INavigationData) => {
  const {label, id, payload, style} = props;
  const type = ACTIONS[id as keyof typeof ACTIONS];
  const dispatch = useDispatch();
  return (
    <Button
      style={style}
      disableProgrammaticRipple
      disableRipple
      rippleTimeout={0}
      rippleClassNames={"appear" as CSSTransitionClassNames}
      onMouseDown={() => {
        dispatch({type, payload});
      }}>{label}</Button>
  );
};

export {NavigationAction};
