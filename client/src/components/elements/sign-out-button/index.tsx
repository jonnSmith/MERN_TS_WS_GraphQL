import * as React from "react";
import { ApolloConsumer } from "react-apollo";
import { Button } from "react-md";
import { signOut } from "../../../helper-functions/sign-out";

const SignOutButton = () => (
  <ApolloConsumer>
    {(client) => (
      <Button raised secondary type="button" onClick={() => signOut(client)}>
        Sign Out
      </Button>
    )}
  </ApolloConsumer>
);

export { SignOutButton };
