import {messageData, messageFields} from "@shared/queries";
import gql from "graphql-tag";

const CREATE_MESSAGE = gql`
  mutation createMessage($text: String!, $workspaceId: String) {
    message: createMessage(text: $text, workspaceId: $workspaceId) ${messageFields}
  }
`;

const DELETE_MESSAGE = gql`
  mutation deleteMessage($id: ID!) {
    message: deleteMessage(id: $id) ${messageFields}
  }
`;

const CHAT_UPDATED = gql`
  subscription chatUpdated {
    chatUpdated ${messageData}
  }`;

export {
    CREATE_MESSAGE,
    DELETE_MESSAGE,
    CHAT_UPDATED,
};
