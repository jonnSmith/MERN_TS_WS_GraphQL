import { ApolloLink, FetchResult, Observable, Operation } from "@apollo/client";
import { GraphQLError, print } from "graphql";
import { Client, ClientOptions, createClient } from "graphql-ws";

class WebSocketLink extends ApolloLink {
    private client: Client;

    constructor(options: ClientOptions) {
        super();
        this.client = createClient(options);
    }

    public request(operation: Operation): Observable<FetchResult> {
        // @ts-ignore
        return new Observable((sink) => {
            return this.client.subscribe<FetchResult>(
                { ...operation, query: print(operation.query) },
                {
                    complete: sink.complete.bind(sink),
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

export {WebSocketLink};
