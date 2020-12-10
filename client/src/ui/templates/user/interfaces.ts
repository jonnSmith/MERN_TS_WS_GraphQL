import {SheetPosition} from "@react-md/sheet";
import {IUserModel} from "@appchat/data/user/interfaces";

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

interface IUpdateForm {
    firstName?: string;
    lastName?: string;
}

interface IUpdateProps {
    onSubmit?: (variables: IUpdateForm) => void;
    user?: IUserModel;
    loading?: boolean;
}

interface ISignUpForm {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

interface IOnlineUserSheetProps {
    visible?: boolean;
    hide?: () => void;
    position: SheetPosition;
}

interface IOnlineUserButtonProps {
    show: () => void;
}

export {
    ISignInProps,
    ISignInForm,
    ISignUpProps,
    ISignUpForm,
    IUpdateProps,
    IUpdateForm,
    IOnlineUserSheetProps,
    IOnlineUserButtonProps};
