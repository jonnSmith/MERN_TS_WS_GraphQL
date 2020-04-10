import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { ApolloLink, split } from "apollo-link";
import { ErrorResponse, onError } from "apollo-link-error";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import * as React from "react";
import { ApolloProvider } from "react-apollo";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import * as WebFontLoader from "webfontloader";

import { Provider } from "react-redux";
import { Store } from "redux";
import configureStore, { IAppState } from "./store";

import { AppWithSession } from "./app";
import { signOut } from "./helper-functions/sign-out";

import config from "./../../configs/config.app";

import "./assets/scss/index.scss";

WebFontLoader.load({
  google: {
    families: ["Roboto:300,400,500,700", "Material Icons"],
  },
});

interface IDefinition {
  kind: string;
  operation?: string;
}

interface IProps {
  store: Store<IAppState>;
}

const httpLink = new HttpLink({
  uri: `http://localhost:${config.server.port}/graphql`,
});

const wsLink = new WebSocketLink({
  options: {
    reconnect: true,
  },
  uri: `ws://localhost:${config.server.port}/graphql`,
});

const terminatingLink = split(
  ({ query }) => {
    const { kind, operation }: IDefinition = getMainDefinition(query);
    return kind === "OperationIDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink,
);

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => {
    const token = localStorage.getItem(config.token.storage);
    if (token) {
      headers = { ...headers, [config.token.header]: token };
    }
    return { headers };
  });
  return forward(operation);
});

const errorLink = onError(({ graphQLErrors, networkError }: ErrorResponse) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      // console.log("GraphQL error", message);
      if (message === "UNAUTHENTICATED") {
        signOut(client);
      }
    });
  }
  if (networkError) {
    // console.log("Network error", networkError);
    if (
      networkError &&
      "statusCode" in networkError &&
      networkError.statusCode === 401
    ) {
      signOut(client);
    }
  }
});

const link = ApolloLink.from([authLink, errorLink, terminatingLink]);
const cache = new InMemoryCache();
const client = new ApolloClient({
  cache,
  link,
});

const Root: React.SFC<IProps> = (props) => {
  return (
    <ApolloProvider client={client}>
      <Provider store={props.store}>
        <Router>
          <AppWithSession />
        </Router>
      </Provider>
    </ApolloProvider>
  );
};

const store = configureStore();
const rootEl = document.getElementById("root");

render(<Root store={store} />, rootEl);
