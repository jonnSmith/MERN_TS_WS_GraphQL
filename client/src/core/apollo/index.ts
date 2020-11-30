import {ApolloClient, ApolloClientOptions, createHttpLink, from, split} from "@apollo/client";
import {ApolloCache, InMemoryCache} from "@apollo/client/cache";
import {setContext} from "@apollo/client/link/context";
import {ApolloLink} from "@apollo/client/link/core";
import {ErrorResponse, onError} from "@apollo/client/link/error";
import {WebSocketLink} from "@apollo/client/link/ws";
import {getMainDefinition} from "@apollo/client/utilities";
import {config} from "@appchat/core/config";
import {CoreStore} from "@appchat/core/store";
import {ACTIONS} from "@appchat/core/store/constants";
import {ClientStorage} from "@appchat/core/store/storage";
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

    private static URI: string = `http://localhost:${config.server.port}/graphql`;

    private static CreateApolloCache = (): ApolloCache<any> => {
        return new InMemoryCache();
    }

    private static CreateApolloLink = (): ApolloLink => {
        return from([
            ApolloConnection.CreateAuthLink(),
            ApolloConnection.CreateErrorLink(),
            ApolloConnection.CreateTerminatingLink()]);
    }

    private static CreateClient(options: ApolloClientOptions<any>) {
        return new ApolloClient(options);
    }

    private static CreateAuthLink() {
        return setContext(async (_, {headers}) => {
            const token = await ClientStorage.read(config.token.storage);
            if (!token) {
                return {headers};
            }
            return {
                headers: {
                    ...headers,
                    [config.token.header]: token,
                },
            };
        });
    }

    private static CreateTerminatingLink() {
        const httpLink = createHttpLink({
            uri: ApolloConnection.URI,
        });

        const wsLink = new WebSocketLink({
            options: {
                connectionParams: async () => {
                    const token = await ClientStorage.read(config.token.storage);
                    return {
                        headers: {
                            [config.token.header]: token,
                        },
                    };
                },
                lazy: true,
                reconnect: true,
                timeout: 100,
            },
            uri: ApolloConnection.URI.replace("http", "ws"),
        });

        return split(
            ({query}) => {
                const definition = getMainDefinition(query);
                return (
                    definition.kind === "OperationDefinition" &&
                    definition.operation === "subscription"
                );
            },
            wsLink,
            httpLink,
        );
    }

    private static CreateErrorLink() {
        return onError(({graphQLErrors, networkError}: ErrorResponse): void => {
            if (graphQLErrors) {
                graphQLErrors.forEach(({message, extensions}) => {
                    switch (extensions?.code) {
                        case "UNAUTHENTICATED": {
                            CoreStore.ReduxSaga.dispatch({type: ACTIONS.USER_LOGOUT, payload: UserInitState});
                            // if (response && response.errors) { response.errors = null; }
                            break;
                        }
                        case "BAD_USER_INPUT" || "FORBIDDEN": {
                            console.debug("graphQLError", message);
                            // response.errors = null;
                            break;
                        }
                        case "INTERNAL_SERVER_ERROR": {
                            console.error("graphQLError", message);
                            // response.errors = null;
                            break;
                        }
                    }
                });
            }
            if (networkError) {
                if (!graphQLErrors.length) { console.error("networkError", networkError.message); }
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
