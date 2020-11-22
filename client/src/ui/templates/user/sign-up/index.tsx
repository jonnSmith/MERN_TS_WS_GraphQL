import {SetFloatingTextInputRefs} from "@appchat/ui/templates/functions";
import {SignUpFormInitialObject} from "@appchat/ui/templates/user/constants";
import {ISignUpForm, ISignUpProps} from "@appchat/ui/templates/user/types";
import * as React from "react";
import {Button, CardActions, TextField} from "react-md";

const UserSignUp = (props: ISignUpProps) => {

    const { onSubmit } = props;

    const passwordRef = React.useRef();
    const emailRef = React.useRef();

    const[SignUpForm, updateSignUpForm] = React.useState(SignUpFormInitialObject);

    React.useLayoutEffect(() => {
        SetFloatingTextInputRefs([emailRef, passwordRef]);
    }, [emailRef, passwordRef]);

    const sendSignUpForm = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit(SignUpForm);
    };

    return (<form
        className="md-grid md-grid--no-spacing text-fields__application"
        onSubmit={(event: React.FormEvent) => { sendSignUpForm(event); }}
    >
        <TextField
            id="email"
            name="email"
            onChange={ (value) => { updateSignUpForm({...SignUpForm, ...{ email: value as string}}); } }
            type="email"
            label="Email or Username"
            className="md-cell md-cell--12"
            ref={emailRef}
        />
        <TextField
            id="password"
            name="password"
            onChange={(value) => updateSignUpForm({...SignUpForm, ...{ password: value as string}})}
            type="password"
            label="Password"
            className="md-cell md-cell--12"
            ref={passwordRef}
        />
        <TextField
            id="firstName"
            name="firstName"
            onChange={(value) => updateSignUpForm({...SignUpForm, ...{ firstName: value as string}})}
            type="text"
            label="First Name"
            className="md-cell md-cell--12"
        />
        <TextField
            id="lastName"
            name="lastName"
            onChange={(value) => updateSignUpForm({...SignUpForm, ...{ lastName: value as string}})}
            type="text"
            label="Last Name"
            className="md-cell md-cell--12"
        />
        <CardActions className="md-cell md-cell--12">
            <Button
                raised
                secondary
                className="md-cell--right"
                disabled={Object.keys(SignUpForm).some((key: keyof ISignUpForm) => !SignUpForm[key])}
                type="submit"
            >
                Sign Up
            </Button>
        </CardActions>
    </form>);
};

export {UserSignUp};
