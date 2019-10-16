import * as React from "react";
import * as WebFontLoader from 'webfontloader';
import { render } from "react-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloLink, split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { ErrorResponse, onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { Provider } from 'react-redux';
import { Store } from 'redux';
import configureStore, { IAppState } from './store/Store';

import App from "./components/App";
import { signOut } from './components/Authtorization/SignOut';

import config from './../../configs/config.app';

import "./assets/scss/index.scss";

WebFontLoader.load({
  google: {
    families: ['Roboto:300,400,500,700', 'Material Icons'],
  },
});


interface Definition {
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
  uri: `ws://localhost:${config.server.port}/graphql`,
  options: {
    reconnect: true,
  },
});

const terminatingLink = split(
  ({query}) => {
    const {kind, operation}: Definition = getMainDefinition(query);
    return (
      kind === 'OperationDefinition' && operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({headers = {}}) => {
    const token = localStorage.getItem(config.token.storage);
    if (token) {
      headers = {...headers, [config.token.header]: token};
    }
    return {headers};
  });
  return forward(operation);
});

const errorLink = onError(({graphQLErrors, networkError}: ErrorResponse) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({message, locations, path}) => {
      console.log('GraphQL error', message);
      if (message === 'UNAUTHENTICATED') {
        signOut(client);
      }
    });
  }
  if (networkError) {
    console.log('Network error', networkError);
    if (networkError &&
      'statusCode' in networkError &&
      networkError.statusCode === 401) {
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


const Root: React.SFC<IProps> = props => {
  return (
    <ApolloProvider client={client}>
      <Provider store={props.store}>
        <Router><App /></Router>
      </Provider>
    </ApolloProvider>
  );
};

const store = configureStore();
const rootEl = document.getElementById("root");

render(
  <Root store={store} />,
  rootEl,
);
