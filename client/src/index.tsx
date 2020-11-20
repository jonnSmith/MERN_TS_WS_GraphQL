import { ApolloProvider } from "@apollo/react-hooks";
import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import * as WebFontLoader from "webfontloader";
import { ApolloConnection } from "./gql/client";
import { store } from "./store";

import { App } from "./app";

import "./assets/scss/index.scss";

WebFontLoader.load({
    google: {
        families: ["Roboto:300,400,500,700", "Material Icons"],
    },
});

const Root = () => {
    const client = ApolloConnection.client;
    return (<React.Suspense fallback={<p>Connecting...</p>}>
        <ApolloProvider client={client}>
            <Provider store={store}>
                <Router history={ApolloConnection.history}>
                    <App />
                </Router>
            </Provider>
        </ApolloProvider>
    </React.Suspense>);
};
const rootEl = document.getElementById("root");

render(<Root />, rootEl);
