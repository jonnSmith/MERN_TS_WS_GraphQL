import {useQuery} from "@apollo/react-hooks";
import {CoreNavigation} from "@appchat/core/navigation";
import {ACTIONS} from "@appchat/core/store/constants";
import {StateReturnTypes} from "@appchat/core/store/types";
import {UserInitState} from "@appchat/data/user/constants";
import {GET_ME} from "@appchat/data/user/queries";
import {IAppProps} from "@appchat/ui/containers/interfaces";
import {LoaderSpinner} from "@appchat/ui/elements/loader";
import * as React from "react";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Switch} from "react-router-dom";
import {useUpdate} from "react-use";

const App = (props: IAppProps) => {

  // const [user, setUser] = useState(UserInitState.user);
  const user = useSelector((state: StateReturnTypes) => state.UserReducer.user);
  const update = useUpdate();

  // useEffect(() => {
  //   if (userdata?.email) { setUser(userdata); }
  //   update();
  //   return (): void => { };
  // }, [userdata]);

  return <Switch>
      {CoreNavigation.pages(!!user?.token)}
    </Switch>;
};

export {App};
