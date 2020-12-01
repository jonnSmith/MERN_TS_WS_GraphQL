import {IUserModel} from "@appchat/data/user/interfaces";
import {ReactElement} from "react";

interface IContainerPage {
    children?: ReactElement;
    title?: string;
    className?: string;
}

interface IContainerLayoutProps {
    children?: ReactElement;
    user?: IUserModel;
}

interface IAppProps {
    user?: IUserModel;
}

export { IContainerPage, IAppProps, IContainerLayoutProps };
