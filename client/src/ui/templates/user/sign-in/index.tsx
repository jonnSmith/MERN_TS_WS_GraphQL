import {SetFloatingTextInputRefs} from "@appchat/ui/templates/functions";
import {ISignInProps} from "@appchat/ui/templates/user/interfaces";
import * as React from "react";
import {Button, CardActions, TextField} from "react-md";

const UserSignIn = (props: ISignInProps) => {

    const { onSubmit } = props;
    const [email, setEmail] = React.useState("");
    const [password, setPass] = React.useState("");

    const sendSignInForm = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit({email, password});
    };

    const passwordRef = React.useRef();
    const emailRef = React.useRef();

    React.useLayoutEffect(() => {
        SetFloatingTextInputRefs([passwordRef, emailRef]);
    }, []);

    return (<form
        className="md-grid text-fields__application md-grid--no-spacing"
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
