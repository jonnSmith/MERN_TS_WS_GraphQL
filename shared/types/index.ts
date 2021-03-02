import {Document, DocumentQuery} from "mongoose";
import {PubSubEngine} from "graphql-subscriptions";

type DocumentResult = Document | null | undefined | {};
type DocumentQueryType = DocumentQuery<Document | undefined | null, Document, {}> | null | undefined | Promise<Document>;
type DocumentCollectionType = DocumentQuery<Document[] | null | undefined, Document, {}> | null | undefined | Promise<Document[]>;
type PubSubType = PubSubEngine | null | undefined;

export {DocumentQueryType, DocumentCollectionType, PubSubType, DocumentResult};
