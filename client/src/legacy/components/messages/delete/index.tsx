import * as React from "react";
import { Mutation } from "react-apollo";
import { FontIcon } from "react-md";
import { IMutationInterface } from "../../../interfaces/graphql";
import { DELETE_MESSAGE } from "../../../gql/queries/message";

const MessageDelete = ({ message, filter }) => (
  <Mutation
    mutation={DELETE_MESSAGE}
    variables={{ id: message.id, filter }}
    >
    {(deleteMessage, { data, loading, error }: IMutationInterface) => (
      <FontIcon error onClick={deleteMessage}>delete_sweep</FontIcon>
    )}
  </Mutation>
);

export { MessageDelete };
