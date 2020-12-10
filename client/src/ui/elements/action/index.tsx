import {FetchResult} from "@apollo/client/link/core";
import {MutationFunctionOptions} from "@apollo/client/react/types/types";
import {useMutation} from "@apollo/react-hooks";
import {INavigationData} from "@appchat/core/navigation/interfaces";
import {ACTIONS} from "@appchat/core/store/constants";
import {StateReturnTypes} from "@appchat/core/store/types";
import {Button} from "@react-md/button";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {CSSTransitionClassNames} from "react-transition-group/CSSTransition";

const ActionButton = (props: INavigationData) => {
  const {label, id, payload, style, mutation} = props;
  const type = ACTIONS[id as keyof typeof ACTIONS];
  let mutate: ((options?: MutationFunctionOptions<any, any>) => Promise<FetchResult<any>>);
  let loading: boolean;
  if (mutation) {
    [mutate, {loading}] = useMutation(mutation);
  }
  const { user } = useSelector((state: StateReturnTypes) => state.UserReducer);
  const dispatch = useDispatch();
  return (
    <Button
      style={style}
      disableProgrammaticRipple
      disableRipple
      rippleTimeout={0}
      rippleClassNames={"appear" as CSSTransitionClassNames}
      onMouseDown={(event) => {
        event.preventDefault();
        if (mutate && user && !loading) {
          mutate({variables: { email: user.email }}).then(() => {
            if (payload) { dispatch({type, payload}); }
          });
        } else if (user && payload) {
          dispatch({type, payload});
        }
      }}>{label}</Button>
  );
};

export {ActionButton};
