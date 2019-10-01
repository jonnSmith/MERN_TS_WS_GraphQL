import * as React from "react";
import { ApolloConsumer } from 'react-apollo';

import { ROUTES } from '../../constants/routes';
import history from '../../constants/history';

const SignOutButton = () => (
  <ApolloConsumer>
    {client => (
      <button type="button" onClick={() => signOut(client)}>
        Sign Out
      </button>
    )}
  </ApolloConsumer>
);

const signOut = client => {
  localStorage.removeItem('token');
  client.resetStore();
  history.push(ROUTES.SIGN_IN);
};

export { signOut };
export default SignOutButton;