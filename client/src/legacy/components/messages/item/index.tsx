import * as moment from "moment";
import * as React from "react";
import {ListItem} from "react-md";
import withSession from "../../hoc/session";
import {MessageDelete} from "../delete";

const MessageItemBase = ({ message, session, filter }) => (
  <ListItem
    primaryText={message.user.email}
    secondaryText={message.text + " (" + moment.unix(message.createdAt / 1000).format("YYYY/MM/DD, H:mm") + ") "}

    rightIcon={session && session.currentUser &&
    message.user.id === session.currentUser.id && (
      <MessageDelete message={message} filter={filter} />
    )}
  />
);

const MessageItem = withSession(MessageItemBase);

export { MessageItem };
