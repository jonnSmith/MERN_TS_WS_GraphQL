import {ROUTES} from "../../enums/routes";

const NavigationData = [
    {   action: null,
        auth: false,
        exact: true,
        filename: "sign-in",
        icon: "person",
        id: "SignIn",
        label: "Sign In",
        to: ROUTES.SignIn,
    },
    {
        action: null,
        auth: false,
        exact: true,
        filename: "sign-up",
        icon: "person_add",
        id: "SignUp",
        label: "Sign Up",
        to: ROUTES.SignUp,
    },
    {
        action: null,
        auth: true,
        exact: true,
        filename: "chat-room",
        icon: "chat",
        id: "ChatRoom",
        label: "Chat Room",
        to: ROUTES.ChatRoom,
    },
    {
        action: null,
        auth: true,
        exact: true,
        filename: "account",
        icon: "account_box",
        label: "User Info",
        to: ROUTES.Account,
    },
    {
        action: null,
        auth: false,
        exact: true,
        filename: "home-page",
        icon: "home",
        label: "Home Page",
        to: ROUTES.HomePage,
    },
];

export { NavigationData };
