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
import {getMainDefinition} from "@apollo/client/utilities";
import {WSLink} from "@appchat/core/apollo/wslink";
import {ConfigSettings} from "@appchat/core/config";
import {ClientStorage} from "@appchat/core/store/storage";
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
  private static History: History<unknown>;

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
      const token = await ClientStorage.read(ConfigSettings.token.storage);
      // TODO: headers always undefined - check and fix/refactor if needed
      // console.debug(token, headers);
      if (!token) {
        return {headers};
      }
      return {
        headers: {
          ...headers,
          [ConfigSettings.token.header]: token,
        },
      };
    });
  }

  private static CreateTerminatingLink() {
    const httpLink = createHttpLink({
      uri: `http://${ConfigSettings.server.host}:${ConfigSettings.server.port}/${ConfigSettings.server.path}`,
      useGETForQueries: false,
    });

    const wsLink = new WSLink({
      connectionParams: async () => {
        const token = await ClientStorage.read(ConfigSettings.token.storage);
        console.debug('ws', token);
        return {
          headers: {
            [ConfigSettings.token.header]: token,
          },
        };
      },
      lazy: ConfigSettings.client.apollo.wsLink.lazy,
      url: `ws:${ConfigSettings.server.host}:${ConfigSettings.server.ws}/${ConfigSettings.server.path}`,
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
        for (const {message, extensions} of graphQLErrors) {
          switch (extensions?.code) {
            case "UNAUTHENTICATED": {
              console.debug("graphQLError", message);
              // TODO: Revert comment logout call on authentication all errors
              // CoreStore.ReduxSaga.dispatch({type: ACTIONS.USER_LOGOUT, payload: UserInitState});
              // if (response && response.errors) { response.errors = null; }
              break;
            }
            case "BAD_USER_INPUT" || "FORBIDDEN": {
              console.debug("graphQLError", message);
              // response.errors = null;
              break;
            }
            case "INTERNAL_SERVER_ERROR": {
              console.debug("graphQLError", message);
              // response.errors = null;
              break;
            }
          }
        }
      }
      if (networkError) {
        if (!graphQLErrors) {
          console.debug("networkError", networkError);
        }
      }
    });
  }

  private constructor() {
    const cache = ApolloConnection.CreateApolloCache();
    const link = ApolloConnection.CreateApolloLink();
    ApolloConnection.Client = ApolloConnection.Client || ApolloConnection.CreateClient({
      assumeImmutableResults: true,
      cache,
      defaultOptions: {
        query: {
          errorPolicy: ConfigSettings.client.apollo.options.ErrorPolicy as ErrorPolicy,
          fetchPolicy: ConfigSettings.client.apollo.options.FetchPolicy as FetchPolicy,
        },
        watchQuery: {
          errorPolicy: ConfigSettings.client.apollo.options.ErrorPolicy as ErrorPolicy,
          fetchPolicy: ConfigSettings.client.apollo.options.FetchPolicy as FetchPolicy,
        }
      },
      link,
      queryDeduplication: true,
    });
    ApolloConnection.History = ApolloConnection.History || require("history").createBrowserHistory();
  }

}

export {ApolloConnection};
