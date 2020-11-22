interface ISignInProps {
    onSubmit?: (variables: ISignInForm) => void;
}

interface ISignInForm {
    email: string;
    password: string;
}

interface ISignUpProps {
    onSubmit?: (variables: ISignUpForm) => void;
}

interface ISignUpForm {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export { ISignInProps, ISignInForm, ISignUpProps, ISignUpForm };
