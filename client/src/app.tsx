import * as React from "react";
import NavigationDrawer from "react-md/lib/NavigationDrawers";
import { Route, Switch } from "react-router-dom";
import { NavLink } from "./components/elements/navigation-link";
import withSession from "./components/hoc/session";
import { navItems, ROUTES } from "./constants/routes";

import config from "../../configs/config.app";
import { ChatRoomPage } from "./pages/chat-room";
import { SignInPage } from "./pages/sign-in";
import { SignUpPage } from "./pages/sign-up";
import { UserInfoPage } from "./pages/user-info";

const App = ({ session, refetch }) => (
  <Route
    render={({ location }) => (
      <NavigationDrawer
        drawerTitle={config.app.sidebar}
        toolbarTitle={config.app.name}
        mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY_MINI}
        tabletDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
        desktopDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
        navItems={navItems
          .filter(
            (link) =>
              (session && session.currentUser && link.auth) ||
              ((!session || !session.currentUser) && !link.auth)
          )
          .map((props) => (
            <NavLink {...props} key={props.to} />
          ))}
      >
        <Switch key={location.key}>
          <Route
            exact
            path={ROUTES.SIGN_IN}
            location={location}
            component={() => <SignInPage refetch={refetch} session={session} />}
          />
          <Route
            path={ROUTES.SIGN_UP}
            location={location}
            component={() => <SignUpPage refetch={refetch} session={session} />}
          />
          <Route
            path={ROUTES.CHAT_ROOM}
            location={location}
            component={() => <ChatRoomPage />}
          />
          <Route
            path={ROUTES.USER_INFO}
            location={location}
            component={() => <UserInfoPage />}
          />
        </Switch>
      </NavigationDrawer>
    )}
  />
);

const AppWithSession = withSession(App);
export { AppWithSession };
