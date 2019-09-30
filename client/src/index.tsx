import * as React from "react";
import {render} from "react-dom";
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { OperationDefinitionNode } from 'graphql';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloLink, split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';

import App from "./components/App";
import { signOut } from './components/SignOut';

import config from './../../configs/server/config';

const httpLink = new HttpLink({
  uri: `http://localhost:${config.server.port}/graphql`,
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:${config.server.port}/graphql`,
  options: {
    reconnect: true,
  },
});

const terminatingLink = split(
  ({ query }) => {
    const { kind, operation }: OperationDefinitionNode = getMainDefinition(query);
    return (
      kind === 'OperationDefinition' && operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => {
    const token = localStorage.getItem('token');

    if (token) {
      headers = { ...headers, 'x-token': token };
    }

    return { headers };
  });

  return forward(operation);
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log('GraphQL error', message);

      if (message === 'UNAUTHENTICATED') {
        signOut(client);
      }
    });
  }

  if (networkError ) {
    console.log('Network error', networkError);
    if (networkError.statusCode === 401) {
      signOut(client);
    }
  }
});

const link = ApolloLink.from([authLink, errorLink, terminatingLink]);

const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache,
});

const rootEl = document.getElementById("root");

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  rootEl,
);