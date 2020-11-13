import { signOut } from "../../helper-functions/sign-out";

export enum ROUTES {
  CHAT_ROOM = "/chat",
  SIGN_UP = "/register",
  SIGN_IN = "/",
  USER_INFO = "/account",
}

export const navItems = [
  {
    action: null,
    auth: false,
    exact: true,
    icon: "person",
    id: "SignIn",
    label: "Sign In",
    to: ROUTES[this.id],
  },
  {
    action: null,
    auth: false,
    exact: true,
    icon: "person_add",
    id: "SignIn",
    label: "Sign Up",
    to: ROUTES[this.id],
  },
  {
    action: null,
    auth: true,
    exact: true,
    icon: "chat",
    id: "SignIn",
    label: "Chat Room",
    to: ROUTES[this.id],
  },
  {
    action: null,
    auth: true,
    exact: true,
    icon: "account_box",
    id: "SignIn",
    label: "User Info",
    to: ROUTES[this.id],
  },
];
