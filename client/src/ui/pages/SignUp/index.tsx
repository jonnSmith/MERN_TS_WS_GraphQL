import {useMutation} from "@apollo/react-hooks";
import {ACTIONS} from "@appchat/core/store/constants";
import {SIGN_UP} from "@appchat/data/user/queries";
import {ContainerPage} from "@appchat/ui/containers/page";
import {ISignUpForm} from "@appchat/ui/templates/user/interfaces";
import {UserSignUp} from "@appchat/ui/templates/user/sign-up";
import * as React from "react";
import {useDispatch} from "react-redux";

const SignUp = () => {
  const [signUp, {data, loading}] = useMutation(SIGN_UP);
  const dispatch = useDispatch();

  React.useLayoutEffect(() => {
    if (data && !loading) {
      // dispatch({type: ACTIONS.USER_LOGIN, payload: data});
    }
  }, [data?.user]);

  const RegisterUser = async (variables: ISignUpForm) => {
    await signUp({variables});
  };

  return (<ContainerPage className="sign-out" title="Sign Out">
    <UserSignUp onSubmit={ async (variables) => { await RegisterUser(variables); }}/>
  </ContainerPage>);
};

export default SignUp;
