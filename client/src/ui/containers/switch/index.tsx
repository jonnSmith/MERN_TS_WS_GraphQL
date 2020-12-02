import {CoreNavigation} from "@appchat/core/navigation";
import {StateReturnTypes} from "@appchat/core/store/types";
import * as React from "react";
import {useSelector} from "react-redux";
import {Switch} from "react-router-dom";

const RouterSwitch = () => {
  const user = useSelector((state: StateReturnTypes) => state.UserReducer.user);
  return <Switch>
    {CoreNavigation.pages(!!user?.token)}
  </Switch>;
};

export {RouterSwitch};
