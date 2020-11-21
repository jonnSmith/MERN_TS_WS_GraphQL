import * as React from "react";
import {Button, CardActions, TextField} from "react-md";
import {ILoginProps} from "ui/templates/user/types";

const UserSignIn = (props: ILoginProps) => {

    const { onSubmit } = props;
    const [email, setEmail] = React.useState("");
    const [password, setPass] = React.useState("");

    const sendSignInForm = (event) => {
        event.preventDefault();
        onSubmit({email, password});
    };

    const passwordRef = React.useRef();
    const emailRef = React.useRef();

    React.useLayoutEffect(() => {
        let timeout;
        timeout = setTimeout(() => {
            // @ts-ignore
            passwordRef?.current?.state?.floating = true;
            // @ts-ignore
            emailRef?.current?.state?.floating = true;
        }, 0);
        return () => {
            clearTimeout(timeout);
        };
    }, []);

    return (<form
        className="md-grid text-fields__application"
        onSubmit={(event) => sendSignInForm(event)}
    >
        <TextField
            id="email"
            name="email"
            onChange={(value) => setEmail(value as string)}
            type="email"
            label="Email or Username"
            className="md-cell md-cell--12"
            ref={emailRef}
        />
        <TextField
            id="password"
            name="password"
            onChange={(value) => setPass(value as string)}
            type="password"
            label="Password"
            className="md-cell md-cell--12"
            ref={passwordRef}
        />
        <CardActions className="md-cell md-cell--12">
            <Button
                raised
                primary
                className="md-cell--right"
                disabled={!(email && password)}
                type="submit"
            >
                Sign In
            </Button>
        </CardActions>
    </form>);
};

export {UserSignIn};
