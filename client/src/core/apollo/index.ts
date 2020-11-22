import {ApolloClient, ApolloClientOptions} from "@apollo/client";
import {ApolloCache, InMemoryCache} from "@apollo/client/cache";
import {ApolloLink, split} from "@apollo/client/link/core";
import {ErrorResponse, onError} from "@apollo/client/link/error";
import {HttpLink} from "@apollo/client/link/http";
import {WebSocketLink} from "@apollo/client/link/ws";
import {getMainDefinition} from "@apollo/client/utilities";
import {IApolloClientOptions, IDefinition} from "@appchat/core/apollo/interfaces";
import {config} from "@appchat/core/config";
import {CoreStore} from "@appchat/core/store";
import {ACTIONS} from "@appchat/core/store/constants";
import {UserInitState} from "@appchat/data/user/constants";
import {History} from "history";

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
                graphQLErrors.forEach(({message, extensions, locations, path}) => {
                    console.log("GraphQL error", message);
                    switch (extensions?.code) {
                        case "UNAUTHENTICATED": {
                            CoreStore.ReduxSaga.dispatch({type: ACTIONS.USER_LOGOUT, payload: UserInitState});
                            break;
                        }
                        case "BAD_USER_INPUT": {
                            console.debug(message);
                            break;
                        }
                        case "INTERNAL_SERVER_ERROR": {
                            console.error(message);
                            break;
                        }
                    }
                });
            }
            if (networkError) {
                if (!graphQLErrors.length) { console.error(networkError.message); }
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
