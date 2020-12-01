import {useMutation, useQuery, useSubscription} from "@apollo/react-hooks";
import {MessageInitObject} from "@appchat/data/message/constants";
import {CHAT_UPDATED, CREATE_MESSAGE, PRELOAD_MESSAGE} from "@appchat/data/message/queries";
import {ContainerPage} from "@appchat/ui/containers/page";
import {IMessageSendForm} from "@appchat/ui/templates/message/interfaces";
import {MessageList} from "@appchat/ui/templates/message/list";
import {MessageSend} from "@appchat/ui/templates/message/send";
import * as React from "react";
import {useState} from "react";

const ChatRoom = () => {
  const [message, setMessage] = useState(MessageInitObject);

  const [sendMessage, {data: created, loading: sending}] =
    useMutation(CREATE_MESSAGE, {notifyOnNetworkStatusChange: true});

  const {data: preloaded, loading: preloading} =
    useQuery(PRELOAD_MESSAGE);

  const {data: updated, loading} = useSubscription(CHAT_UPDATED);

  return (<ContainerPage title="Chat room">
    <section>
      <MessageList message={message} active={!loading}/>
      <MessageSend
        onSubmit={(variables: IMessageSendForm) => {
          sendMessage({variables});
        }}
        loading={sending}/>
      <p>1 {JSON.stringify(created)}</p>
      <p>2 {JSON.stringify(updated)}</p>
      <p>3 {JSON.stringify(preloaded)}</p>
      <p>4 {JSON.stringify(message)}</p>
    </section>
  </ContainerPage>);
};

export default ChatRoom;
