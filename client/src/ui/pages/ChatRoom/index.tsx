import {useMutation, useQuery, useSubscription} from "@apollo/react-hooks";
import {CHAT_UPDATED, CREATE_MESSAGE, PRELOAD_MESSAGE} from "@appchat/data/message/queries";
import {ContainerPage} from "@appchat/ui/containers/page";
import {MessageList} from "@appchat/ui/templates/message/list";
import {IMessageSendForm} from "@appchat/ui/templates/message/interfaces";
import {MessageSend} from "@appchat/ui/templates/message/send";
import * as React from "react";
import {useState} from "react";
import {Paper} from "react-md";

const ChatRoom = () => {
  const [message, setMessage] = useState(null);
  const [sendMessage, {data: created, loading: sending}] =
    useMutation(CREATE_MESSAGE, {notifyOnNetworkStatusChange: true});
  const {data: preloaded, loading: preloading} =
    useQuery(PRELOAD_MESSAGE, {notifyOnNetworkStatusChange: true});
  const {data: updated, loading} =
    useSubscription(CHAT_UPDATED);

  React.useEffect(() => {
    if (!loading && updated && updated.chatUpdated && message.id !== updated.chatUpdated.message.id) {
      setMessage(updated.chatUpdated.message);
    } else if (!preloading && preloaded && preloaded.message) {
      setMessage(preloaded.message);
    }
    return () => {
      console.log("cleaned up");
    };
  }, [preloading, loading]);

  return (<ContainerPage title="Chat room">
    <Paper>
      <MessageList message={message} active={!loading}/>
      <MessageSend
        onSubmit={(variables: IMessageSendForm) => {
          sendMessage({variables});
        }}
        loading={sending}/>
      <p>1 {JSON.stringify(created)}</p>
      <p>2 {JSON.stringify(updated)}</p>
      <p>3 {JSON.stringify(preloaded)}</p>
    </Paper>
  </ContainerPage>);
};

export default ChatRoom;
