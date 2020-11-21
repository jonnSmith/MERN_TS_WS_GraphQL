import {useMutation} from "@apollo/react-hooks";
import {ACTIONS} from "core/store/constants";
import {SIGN_IN} from "data/user/queries";
import * as React from "react";
import {Card, CardTitle} from "react-md";
import {useDispatch} from "react-redux";
import {UserSignIn} from "ui/templates/user/sign-in";
import {ILoginForm} from "ui/templates/user/types";

const SignIn = () => {

    const [signIn, {data}] = useMutation(SIGN_IN);
    const dispatch = useDispatch();

    const LoginUser = (variables: ILoginForm) => {
        signIn({variables});
    };

    React.useLayoutEffect(() => {
        if (data?.user) {
            dispatch({type: ACTIONS.USER_LOGIN, payload: data});
        }
    }, [data?.user]);

    return (
        <div className="md-block-centered sign-in">
            <Card>
                <CardTitle title="SignIn" />
                <UserSignIn onSubmit={(variables) => { LoginUser(variables); } } />
            </Card>
        </div>);
};

export default SignIn;
