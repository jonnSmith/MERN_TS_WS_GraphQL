import {ApolloCache} from "apollo-cache";
import {ApolloLink} from "apollo-link";

interface IDefinition {
    kind: string;
    operation?: string;
}

interface IApolloClientOptions {
    cache: ApolloCache<any>;
    link: ApolloLink;
}

export { IDefinition, IApolloClientOptions };
