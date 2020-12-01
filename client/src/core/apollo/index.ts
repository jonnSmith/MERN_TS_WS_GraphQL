import {
  ApolloCache,
  ApolloClient,
  ApolloClientOptions,
  ApolloLink,
  createHttpLink,
  ErrorPolicy,
  FetchPolicy,
  from,
  InMemoryCache,
  split
} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
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
    if (!ApolloConnection.Client) {
      new ApolloConnection();
    }
    return ApolloConnection.Client;
  }

  public static get history() {
    if (!ApolloConnection.History) {
      new ApolloConnection();
    }
    return ApolloConnection.History;
  }

  private static Client: ApolloClient<any>;
  private static History: History;

  private static CreateApolloCache = (): ApolloCache<any> => {
    return new InMemoryCache();
  }

  private static CreateApolloLink = (): ApolloLink => {
    const FromLink: ApolloLink = from([
      ApolloConnection.CreateAuthLink(),
      ApolloConnection.CreateErrorLink(),
      ApolloConnection.CreateTerminatingLink()]);
    return FromLink;
  }

  private static CreateClient(options: ApolloClientOptions<any>) {
    return new ApolloClient(options);
  }

  private static CreateAuthLink() {
    const AuthLink = setContext(async (_, {headers}) => {
      const token = await ClientStorage.read(config.token.storage);
      // TODO: headers always undefined - check and fix/refactor if needed
      // console.debug(token, headers);
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
    return AuthLink;
  }

  private static CreateTerminatingLink() {
    const httpLink = createHttpLink({
      uri: `http://${config.server.host}:${config.server.port}/${config.server.path}`,
      useGETForQueries: false,
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
        lazy: config.client.apollo.wsLink.lazy,
        reconnect: config.client.apollo.wsLink.reconnect,
        reconnectionAttempts: config.client.apollo.wsLink.reconnectionAttempts,
        timeout: config.client.apollo.wsLink.timeout,
      },
      uri: `ws:${config.server.host}:${config.server.ws}/${config.server.path}`,
    });

    // @ts-ignore
    // tslint:disable-next-line:max-line-length
    wsLink.subscriptionClient.maxConnectTimeGenerator.duration = () => wsLink.subscriptionClient.maxConnectTimeGenerator.max;

    const SplitLink = split(
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
    return SplitLink;
  }

  private static CreateErrorLink() {
    const ErrorLink = onError(({graphQLErrors, networkError}: ErrorResponse): void => {
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
        if (!graphQLErrors) {
          console.error("networkError", networkError.message);
        }
      }
    });
    return ErrorLink;
  }

  private constructor() {
    const cache = ApolloConnection.CreateApolloCache();
    const link = ApolloConnection.CreateApolloLink();
    ApolloConnection.Client = ApolloConnection.Client || ApolloConnection.CreateClient({
      assumeImmutableResults: true,
      cache,
      defaultOptions: {
        query: {
          errorPolicy: config.client.apollo.options.ErrorPolicy as ErrorPolicy,
          fetchPolicy: config.client.apollo.options.FetchPolicy as FetchPolicy,
        },
        watchQuery: {
          errorPolicy: config.client.apollo.options.ErrorPolicy as ErrorPolicy,
          fetchPolicy: config.client.apollo.options.FetchPolicy as FetchPolicy,
        }
      },
      link,
      queryDeduplication: true,
    });
    ApolloConnection.History = ApolloConnection.History || require("history").createBrowserHistory();
  }

}

export {ApolloConnection};
