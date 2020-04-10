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
    label: "Sign In",
    to: ROUTES.SIGN_IN,
  },
  {
    action: null,
    auth: false,
    exact: true,
    icon: "person_add",
    label: "Sign Up",
    to: ROUTES.SIGN_UP,
  },
  {
    action: null,
    auth: true,
    exact: true,
    icon: "chat",
    label: "Chat Room",
    to: ROUTES.CHAT_ROOM,
  },
  {
    action: null,
    auth: true,
    exact: true,
    icon: "account_box",
    label: "User Info",
    to: ROUTES.USER_INFO,
  },
  {
    action: signOut,
    auth: true,
    exact: true,
    icon: "exit_to_app",
    label: "Sign Out",
    to: null,
  },
];
