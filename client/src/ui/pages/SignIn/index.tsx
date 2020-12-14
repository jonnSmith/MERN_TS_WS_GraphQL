import {useMutation} from "@apollo/react-hooks";
import {ACTIONS} from "@appchat/core/store/constants";
import {SIGN_IN} from "@appchat/data/user/queries";
import {ContainerPage} from "@appchat/ui/containers/page";
import {ISignInForm} from "@appchat/ui/templates/user/interfaces";
import {UserSignIn} from "@appchat/ui/templates/user/sign-in";
import * as React from "react";
import {useDispatch} from "react-redux";

const SignIn = () => {
  const [signIn, {data, loading}] = useMutation(SIGN_IN);
  const dispatch = useDispatch();

  const LoginUser = async (variables: ISignInForm) => {
    await signIn({variables});
  };

  React.useEffect(() => {
    if (data && !loading) {
      console.debug("data", data);
      // dispatch({type: ACTIONS.HANDLE_PAYLOAD, payload: data?.payload});
    }
    return () => {};
  }, [data && loading]);

  return (
    <ContainerPage title="Sign in" className="sign-in">
      <UserSignIn onSubmit={ async (variables: ISignInForm) => { await LoginUser(variables); }}/>
    </ContainerPage>);
};

export default SignIn;
