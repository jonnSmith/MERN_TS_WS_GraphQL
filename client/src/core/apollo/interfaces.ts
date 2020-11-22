import {ApolloCache} from "@apollo/client/cache";
import {ApolloLink} from "@apollo/client/link/core";

interface IDefinition {
    kind: string;
    operation?: string;
}

interface IApolloClientOptions {
    cache: ApolloCache<any>;
    link?: ApolloLink;
}

export { IDefinition, IApolloClientOptions };
