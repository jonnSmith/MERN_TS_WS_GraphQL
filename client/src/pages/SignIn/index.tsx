import {useMutation} from "@apollo/react-hooks";
import * as React from "react";
import {Card, CardTitle} from "react-md";
import {useDispatch} from "react-redux";
import { LoginForm } from "../../components/form/login";
import {ILoginForm} from "../../components/form/login/types";
import {SIGN_IN} from "../../gql/queries/user";
import {ACTIONS} from "../../misc/constants/store";

const SignIn: React.FC = () => {

    const [signIn, {data}] = useMutation(SIGN_IN);
    const dispatch = useDispatch();

    const LoginUser = (variables: ILoginForm) => {
        signIn({variables});
    };

    React.useLayoutEffect(() => {
        if (data?.user) {
            dispatch({type: ACTIONS.USER_LOGIN, payload: data.user});
        }
    }, [data?.user]);

    return (
        <div className="md-block-centered sign-in">
            <Card>
                <CardTitle title="SignIn" />
                <LoginForm onSubmit={(variables) => { LoginUser(variables); } } />
            </Card>
        </div>);
};

export default SignIn;
