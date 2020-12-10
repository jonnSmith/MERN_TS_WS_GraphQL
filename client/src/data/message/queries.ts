import {MessageFields} from "@appchat/data/message/constants";
import gql from "graphql-tag";

const CREATE_MESSAGE = gql`
  mutation CreateMessage($text: String!) {
    message: createMessage(text: $text) ${MessageFields}
  }
`;

const DELETE_MESSAGE = gql`
  mutation($id: ID!) {
    deleteMessage(id: $id) ${MessageFields}
  }
`;

const CHAT_UPDATED = gql`
  subscription chatUpdated {
    chatUpdated {
      action
      message ${MessageFields}
    }
  }`;


export {
    CREATE_MESSAGE,
    DELETE_MESSAGE,
    CHAT_UPDATED,
};
