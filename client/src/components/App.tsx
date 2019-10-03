import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import NavigationDrawer from 'react-md/lib/NavigationDrawers';
import NavLink from './Helpers/Link/NavLink';
import { ROUTES, navItems } from '../constants/routes';
import withSession from './Helpers/Session/withSession';

import SignInPage from './Authtorization/SignIn';
import SignUpPage from './Authtorization/SignUp';
import ChatRoom from './Pages/ChatRoom';
import UserInfo from './Pages/UserInfo';
import config from '../../../configs/config.app'

const App = ({ session, refetch }) => (
  <Route
    render={({ location }) => (
      <NavigationDrawer
        drawerTitle={config.app.sidebar}
        toolbarTitle={config.app.name}
        mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY_MINI}
        tabletDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
        desktopDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
        navItems={
          navItems.filter(
          link => (session && session.currentUser && link.auth) || ((!session || !session.currentUser) && !link.auth)
          ).map(
            props =>  <NavLink {...props} key={props.to}/>
          )
        }
      >
        <Switch key={location.key}>
          <Route exact path={ROUTES.SIGN_IN} location={location} component={() => <SignInPage refetch={refetch} session={session} />} />
          <Route path={ROUTES.SIGN_UP} location={location} component={() => <SignUpPage refetch={refetch} session={session}/>} />
          <Route path={ROUTES.CHAT_ROOM} location={location} component={() => <ChatRoom/>} />
          <Route path={ROUTES.USER_INFO} location={location} component={() => <UserInfo/>} />
        </Switch>
      </NavigationDrawer>
    )}
  />
);

export default withSession(App);
