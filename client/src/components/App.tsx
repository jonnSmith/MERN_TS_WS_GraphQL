import * as React from "react";
import { Router, Route } from 'react-router-dom';
import SignInPage from './Authtorization/SignIn';
import ChatRoom from './ChatRoom';
import withSession from './Helpers/Session/withSession';
import { ROUTES } from '../constants/routes';
import history from '../constants/history';

const App = ({ session, refetch }) => (
  <Router history={history}>
    <div>
      <hr />
      <Route
        exact
        path={ROUTES.CHAT_ROOM}
        component={() => <ChatRoom/>}
      />
      <Route
        exact
        path={ROUTES.SIGN_IN}
        component={() => <SignInPage refetch={refetch} />}
      />
    </div>
  </Router>
);

export default withSession(App);
