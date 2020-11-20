import { INavigationData } from "../../../components/navigation/types";
import {UserInitState} from "../../../store/reducers/constants";
import {ROUTES} from "../../enums/routes";

const NavigationData: INavigationData[] = [
    {
        auth: false,
        exact: true,
        icon: "person",
        id: "SignIn",
        label: "Sign In",
        payload: null
    },
    {
        auth: false,
        exact: true,
        icon: "person_add",
        id: "SignUp",
        label: "Sign Up",
        payload: null
    },
    {
        auth: true,
        exact: true,
        icon: "chat",
        id: "ChatRoom",
        label: "Chat Room",
        payload: null
    },
    {
        auth: true,
        exact: true,
        icon: "account_box",
        id: "Account",
        label: "User Info",
        payload: null
    },
    {
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

const NavigationPathsSecurity = {};
NavigationData.forEach( (r) => { NavigationPathsSecurity[ROUTES[r.id]] = r.auth; });

export { NavigationData, NavigationPathsSecurity, INavigationData };
