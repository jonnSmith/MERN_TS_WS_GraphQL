import { ApolloLink, FetchResult, Observable, Operation } from "@apollo/client";
import {CoreStore} from "@appchat/core/store";
import {ACTIONS} from "@appchat/core/store/constants";
import {IMessageModel} from "@appchat/data/message/interfaces";
import {IUserModel} from "@appchat/data/user/interfaces";
import {IOnlineUserData} from "@appchat/data/user/interfaces";
import {GraphQLError, print} from "graphql";
import {Client, ClientOptions, createClient} from "graphql-ws";

class WSLink extends ApolloLink {

  private readonly client: Client;

  constructor(options: ClientOptions) {
    super();
    this.client = this.client || createClient(options);
    this.client.on(
      "connected",
      (socket, payload: {user: IUserModel, message: IMessageModel, list: IOnlineUserData[]}) => {
        const {user, message, list} = payload;
        CoreStore.ReduxSaga.dispatch({type: user ? ACTIONS.USER_LOGIN : ACTIONS.USER_LOGOUT, payload: {user} });
        if (message && user) {
          CoreStore.ReduxSaga.dispatch(
            {type: ACTIONS.MESSAGE_PRELOADED, payload: { message } }
            );
        }
        if (list && user) {
          CoreStore.ReduxSaga.dispatch({type: ACTIONS.ONLINE_CHANGED, payload: {list}});
        }
    });
    this.client.on("closed", (event) => {
      console.debug("closed", event);
    });
  }

  public request(operation: Operation): Observable<FetchResult> {
    return new Observable((sink) => {
      return this.client.subscribe<FetchResult>(
        { ...operation, query: print(operation.query) },
        {
          complete: () => { sink.complete.bind(sink); },
          error: (err) => {
            if (err instanceof Error) {
              sink.error(err);
            } else if (err instanceof CloseEvent) {
              sink.error(
                new Error(
                  `Socket closed with event ${err.code}` + err.reason
                    ? `: ${err.reason}` // reason will be available on clean closes
                    : "",
                ),
              );
            } else {
              sink.error(
                new Error(
                  (err as GraphQLError[])
                    .map(({ message }) => message)
                    .join(", "),
                ),
              );
            }
          },
          next: sink.next.bind(sink),
        },
      );
    });
  }
}

export {WSLink};