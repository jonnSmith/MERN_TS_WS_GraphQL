import {IOnlineUserButtonProps} from "@appchat/ui/templates/user/online/interfaces";
import * as React from "react";
import {Button} from "react-md";
import {CSSTransitionClassNames} from "react-transition-group/CSSTransition";

const UserOnlineButton = (ButtonProps: IOnlineUserButtonProps) => {
  const {show} = ButtonProps;

  return <Button
    disableProgrammaticRipple
    disableRipple
    rippleTimeout={0}
    rippleClassNames={"appear" as CSSTransitionClassNames}
    id="show-sheet-online-users"
    onClick={show}
  >
    Online users
  </Button>;
};

export {UserOnlineButton};
