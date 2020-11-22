import {ApolloProvider} from "@apollo/react-hooks";
import {ApolloConnection} from "@appchat/core/apollo";
import {CoreStore} from "@appchat/core/store";
import {LoaderFallback} from "@appchat/ui/elements/loader";
import * as React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";
import * as WebFontLoader from "webfontloader";

import { App } from "./app";

require("../../node_modules/react-md/dist/react-md.blue-deep_purple.min.css");

WebFontLoader.load({
    google: {
        families: ["Roboto:300,400,500,700", "Material Icons"],
    },
});

const Root = () => {
    return (
        <ApolloProvider client={ApolloConnection.client}>
            <Provider store={CoreStore.ReduxSaga}>
                <Router history={ApolloConnection.history}>
                    <App />
                </Router>
            </Provider>
        </ApolloProvider>);
};
const rootEl = document.getElementById("root");

render(<Root />, rootEl);
