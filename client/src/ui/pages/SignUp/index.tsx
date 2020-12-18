import {useMutation} from "@apollo/react-hooks";
import {ACTIONS} from "@appchat/core/store/constants";
import {SIGN_UP} from "@appchat/data/user/queries";
import {ContainerPage} from "@appchat/ui/containers/page";
import {ISignUpForm} from "@appchat/ui/templates/user/interfaces";
import {UserSignUp} from "@appchat/ui/templates/user/sign-up";
import * as React from "react";
import {useDispatch} from "react-redux";

const SignUp = () => {
  const [signUp] = useMutation(SIGN_UP);
  const dispatch = useDispatch();

  const RegisterUser = async (variables: ISignUpForm) => {
    const {data} = await signUp({variables});
    dispatch({type: ACTIONS.HANDLE_PAYLOAD, payload: data?.payload});
    return true;
  };

  return (<ContainerPage className="sign-out" title="Sign up">
    <UserSignUp onSubmit={RegisterUser}/>
  </ContainerPage>);
};

export default SignUp;
