import {ROUTES, RouteString} from "../../enums/routes";

interface INavigationData {
    action?: any;
    auth: boolean;
    exact: boolean;
    icon: string;
    id: RouteString;
    label: string;
}

const NavigationData: INavigationData[] = [
    {   action: null,
        auth: false,
        exact: true,
        icon: "person",
        id: "SignIn",
        label: "Sign In",
    },
    {
        action: null,
        auth: false,
        exact: true,
        icon: "person_add",
        id: "SignUp",
        label: "Sign Up",
    },
    {
        action: null,
        auth: true,
        exact: true,
        icon: "chat",
        id: "ChatRoom",
        label: "Chat Room",
    },
    {
        action: null,
        auth: true,
        exact: true,
        icon: "account_box",
        id: "Account",
        label: "User Info",
    },
    {
        action: null,
        auth: false,
        exact: true,
        icon: "home",
        id: "HomePage",
        label: "Home Page",
    },
];

const NavigationPathsSecurity = {};
NavigationData.forEach( (r) => { NavigationPathsSecurity[ROUTES[r.id]] = r.auth; });

export { NavigationData, NavigationPathsSecurity, INavigationData };
