import {ApolloProvider} from "@apollo/react-hooks";
import {App} from "@appchat/app";
import {ApolloConnection} from "@appchat/core/apollo";
import {CoreStore} from "@appchat/core/store";
import {LayoutContainer} from "@appchat/ui/containers/layout";
import {ConnectedRouter} from "connected-react-router";
import * as React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import "./index.scss";

const Root = () => {
  return <ApolloProvider client={ApolloConnection.client}>
    <Provider store={CoreStore.ReduxSaga}>
      <ConnectedRouter history={ApolloConnection.history}>
        <LayoutContainer><App/></LayoutContainer>
      </ConnectedRouter>
    </Provider>
  </ApolloProvider>;
};
const rootEl = document.getElementById("root");

render(<Root/>, rootEl);
