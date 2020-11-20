import * as React from "react";
import {Button, CardActions, TextField} from "react-md";
import { ILoginProps } from "./types";

const LoginForm = (props: ILoginProps) => {

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
        if (passwordRef?.current && emailRef?.current) {
            timeout = setTimeout(() => {
                // @ts-ignore
                passwordRef?.current?.focus();
                // @ts-ignore
                emailRef?.current.focus();
            }, 0);
        }
        return () => {
            clearTimeout(timeout);
        };
    }, [passwordRef?.current, emailRef?.current]);

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

export {LoginForm};
