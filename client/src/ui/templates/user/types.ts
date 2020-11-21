interface ILoginProps {
    onSubmit?: (variables: ILoginForm) => void;
}

interface ILoginForm {
    email: string;
    password: string;
}

export { ILoginProps, ILoginForm };
