import {ROUTES} from "@appchat/core/navigation/enums";
import {INavigationData} from "@appchat/core/navigation/interfaces";
import {INavigationPathsSecurity} from "@appchat/core/navigation/types";
import {UserInitState} from "@appchat/data/user/constants";

const NavigationData: INavigationData[] = [
    {
        active: false,
        auth: false,
        exact: true,
        icon: "person",
        id: "SignIn",
        label: "Sign In",
        payload: null
    },
    {
        active: false,
        auth: false,
        exact: true,
        icon: "person_add",
        id: "SignUp",
        label: "Sign Up",
        payload: null
    },
    {
        active: false,
        auth: true,
        exact: true,
        icon: "account_box",
        id: "Account",
        label: "User Info",
        payload: null
    },
    {
        active: false,
        auth: true,
        exact: true,
        icon: "chat",
        id: "ChatRoom",
        label: "Chat Room",
        payload: null
    },
    {
        active: false,
        auth: false,
        exact: true,
        icon: "home",
        id: "HomePage",
        label: "Home Page",
        payload: null
    },
    {
        auth: true,
        exact: false,
        icon: "close",
        id: "USER_LOGOUT",
        label: "Logout",
        payload: UserInitState
    },
];

const NavigationPathsSecurity: INavigationPathsSecurity = {} as INavigationPathsSecurity;
NavigationData
    .filter((r) => typeof ROUTES[r.id] !== "undefined"  )
    .forEach( (r) => { NavigationPathsSecurity[ROUTES[r.id]] = r.auth; });

export { NavigationData, NavigationPathsSecurity, INavigationData };
