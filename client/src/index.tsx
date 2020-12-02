import {ApolloProvider} from "@apollo/react-hooks";
import {App} from "@appchat/app";
import {ApolloConnection} from "@appchat/core/apollo";
import {CoreStore} from "@appchat/core/store";
import * as React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import "./index.scss";

render(<ApolloProvider client={ApolloConnection.client}>
    <Provider store={CoreStore.ReduxSaga}><App /></Provider>
  </ApolloProvider>, document.getElementById("root"));
