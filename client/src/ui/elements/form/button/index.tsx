import {IButtonProps} from "@appchat/ui/elements/form/interfaces";
import * as React from "react";
import {Button, CircularProgress, FontIcon, TextIconSpacing} from "react-md";
import {CSSTransitionClassNames} from "react-transition-group/CSSTransition";

const FormButton = (props: IButtonProps) => {
  const {sending, title} = props;
  return <Button
    disabled={sending}
    theme={"secondary"}
    themeType={"contained"}
    type="submit"
    disableProgrammaticRipple
    disableRipple
    rippleTimeout={0}
    children={
      <TextIconSpacing
        children={sending ? `Sending` : `${title}`}
        iconAfter={false}
        icon={sending ?
          <CircularProgress id="loading-sign-in" style={{marginRight: "10px"}}/> :
          <FontIcon style={{width: "24px"}}>done</FontIcon>
        }/>}
    rippleClassNames={"appear" as CSSTransitionClassNames}/>;
};

export {FormButton};
