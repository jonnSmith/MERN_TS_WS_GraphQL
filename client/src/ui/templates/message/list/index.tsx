import {useMutation} from "@apollo/react-hooks";
import {StateReturnTypes} from "@appchat/core/store/types";
import {DELETE_MESSAGE} from "@appchat/data/message/queries";
import {IMessageListProps} from "@appchat/ui/elements/message/interfaces";
import {MessagesListItem} from "@appchat/ui/elements/message/item";
import * as React from "react";
import { List } from "react-md";
import {useSelector} from "react-redux";

const MessageList = (props: IMessageListProps) => {
  const {message, active} = props;
  const [deleteMessage, {data: deleted, loading: deleting}] = useMutation(DELETE_MESSAGE);
  const { user } = useSelector((state: StateReturnTypes) => state.UserReducer);

  React.useEffect( () => {
    console.debug("message", message);
    console.debug("user", user);
    return () => { console.debug("unmount"); };
  }, [active, user]);

  return <List>
    <MessagesListItem
      message={message}
      user={user}
      active={active}
      onDelete={async () => { await deleteMessage({ variables: { id: message.id} }); }}
      key={`message-stack`}
    /></List>;
};

export {MessageList};
