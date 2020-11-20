enum ROUTES {
  ChatRoom = "/chat",
  SignUp = "/register",
  SignIn = "/login",
  Account = "/account",
  HomePage = "/"
}

type RouteString = keyof typeof ROUTES;

export { ROUTES, RouteString };
