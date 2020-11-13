import {ApolloCache} from "apollo-cache";
import {InMemoryCache} from "apollo-cache-inmemory";
import {ApolloClient, ApolloClientOptions} from "apollo-client";
import {ApolloLink, split} from "apollo-link";
import {ErrorResponse, onError} from "apollo-link-error";
import {HttpLink} from "apollo-link-http";
import {WebSocketLink} from "apollo-link-ws";
import {getMainDefinition} from "apollo-utilities";
import {History} from "history";
import config from "../../../../configs/config.app";
import {signOut} from "../../misc/helpers/sign-out";
import {IApolloClientOptions, IDefinition} from "./types";

class ApolloConnection {

    public static get client() {
        // tslint:disable-next-line:no-unused-expression
        if (!ApolloConnection.Client) { new ApolloConnection(); }
        return ApolloConnection.Client;
    }

    public static get history() {
        // tslint:disable-next-line:no-unused-expression
        if (!ApolloConnection.History) { new ApolloConnection(); }
        return ApolloConnection.History;
    }

    private static Client: ApolloClient<any>;
    private static History: History;

    private static CreateApolloCache = (): ApolloCache<any> => {
       return new InMemoryCache();
    }

    private static CreateApolloLink = (): ApolloLink => {
        return ApolloLink.from([
            ApolloConnection.CreateAuthLink(),
            ApolloConnection.CreateErrorLink(),
            ApolloConnection.CreateTerminatingLink()]);
    }

    private static CreateClient(
        ClientOptions: ApolloClientOptions<IApolloClientOptions>):
        ApolloClient<ApolloClientOptions<IApolloClientOptions>> {
        return new ApolloClient(ClientOptions);
    }

    private static CreateAuthLink() {
        return new ApolloLink((operation, forward) => {
            operation.setContext(({headers = {}}) => {
                const token = localStorage.getItem(config.token.storage);
                if (token) {
                    headers = {...headers, [config.token.header]: token};
                }
                return {headers};
            });
            return forward(operation);
        });
    }

    private static CreateTerminatingLink() {
        const httpLink = new HttpLink({
            uri: `http://localhost:${config.server.port}/graphql`,
        });

        const wsLink = new WebSocketLink({
            options: {
                reconnect: true,
            },
            uri: `ws://localhost:${config.server.port}/graphql`,
        });

        return split(
            ({query}) => {
                const {kind, operation}: IDefinition = getMainDefinition(query);
                return kind === "OperationIDefinition" && operation === "subscription";
            },
            wsLink,
            httpLink,
        );
    }

    private static CreateErrorLink() {
        return onError(({graphQLErrors, networkError}: ErrorResponse) => {
            if (graphQLErrors) {
                graphQLErrors.forEach(({message, locations, path}) => {
                    // console.log("GraphQL error", message);
                    if (message === "UNAUTHENTICATED") {
                        signOut(ApolloConnection.client);
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
                    signOut(ApolloConnection.client);
                }
            }
        });
    }

    private constructor() {
        const cache = ApolloConnection.CreateApolloCache();
        const link = ApolloConnection.CreateApolloLink();
        ApolloConnection.Client = ApolloConnection.Client || ApolloConnection.CreateClient({cache, link});
        ApolloConnection.History = ApolloConnection.History || require("history").createBrowserHistory();
    }

}

export { ApolloConnection };
