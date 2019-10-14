import * as React from "react";
import { Mutation } from 'react-apollo';
import { FontIcon } from 'react-md';
import { DELETE_MESSAGE } from '../../queries/message';

const MessageDelete = ({ message, filter }) => (
  <Mutation
    mutation={DELETE_MESSAGE}
    variables={{ id: message.id, filter: filter }}
    >
    {(deleteMessage, { data, loading, error }) => (
      <FontIcon error onClick={deleteMessage}>delete_sweep</FontIcon>
    )}
  </Mutation>
);

export default MessageDelete;