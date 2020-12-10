import {RouteString} from "@appchat/core/navigation/types";
import {ActionsString} from "@appchat/core/store/types";
import {TypedDocumentNode} from "@graphql-typed-document-node/core";
import {DocumentNode} from "graphql";

interface INavigationData {
    auth?: boolean;
    active?: boolean;
    exact?: boolean;
    icon?: string;
    id: RouteString | ActionsString;
    label: string;
    payload?: any;
    visible?: boolean;
    style?: any;
    query?: DocumentNode | TypedDocumentNode;
    mutation?: DocumentNode | TypedDocumentNode;
}

export { INavigationData };
