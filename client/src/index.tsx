import {ApolloProvider} from "@apollo/react-hooks";
import {App} from "@appchat/app";
import {ApolloConnection} from "@appchat/core/apollo";
import {CoreStore} from "@appchat/core/store";
import {LayoutContainer} from "@appchat/ui/containers/layout";
import {Configuration} from "@react-md/layout";
import * as React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";
import "./index.scss";

const Root = () => {
  return <Router history={ApolloConnection.history}>
    <Provider store={CoreStore.ReduxSaga}>
      <ApolloProvider client={ApolloConnection.client}>
        <Configuration>
          <LayoutContainer><App/></LayoutContainer>
        </Configuration>
      </ApolloProvider>
    </Provider>
  </Router>;
};
const rootEl = document.getElementById("root");

render(<Root/>, rootEl);
