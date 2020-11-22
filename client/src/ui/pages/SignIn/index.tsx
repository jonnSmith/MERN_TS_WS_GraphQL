import {useMutation} from "@apollo/react-hooks";
import {ACTIONS} from "@appchat/core/store/constants";
import {SIGN_IN} from "@appchat/data/user/queries";
import {ContainerPage} from "@appchat/ui/containers/page";
import {UserSignIn} from "@appchat/ui/templates/user/sign-in";
import {ISignInForm} from "@appchat/ui/templates/user/types";
import * as React from "react";
import {useDispatch} from "react-redux";

const SignIn = () => {

    const [signIn, {data}] = useMutation(SIGN_IN);
    const dispatch = useDispatch();

    const LoginUser = (variables: ISignInForm) => {
        signIn({variables});
    };

    React.useLayoutEffect(() => {
        if (data?.user) {
            dispatch({type: ACTIONS.USER_LOGIN, payload: data});
        }
    }, [data?.user]);

    return (
        <ContainerPage title="Sign in" className="sign-in">
            <UserSignIn onSubmit={(variables) => { LoginUser(variables); } } />
        </ContainerPage>);
};

export default SignIn;
