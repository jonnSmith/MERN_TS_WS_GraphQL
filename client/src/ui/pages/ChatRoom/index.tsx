import {useMutation, useQuery, useSubscription} from "@apollo/react-hooks";
import {ACTIONS} from "@appchat/core/store/constants";
import {CHAT_UPDATED, CREATE_MESSAGE, DELETE_MESSAGE, PRELOAD_MESSAGE} from "@appchat/data/message/queries";
import {ContainerPage} from "@appchat/ui/containers/page";
import {IMessageSendForm} from "@appchat/ui/templates/message/interfaces";
import {MessageList} from "@appchat/ui/templates/message/list";
import {MessageSend} from "@appchat/ui/templates/message/send";
import * as React from "react";
import {useEffect} from "react";
import {useDispatch} from "react-redux";

const ChatRoom = () => {

  const [sendMessage,
    {data: created, loading: sending}] = useMutation(CREATE_MESSAGE, {notifyOnNetworkStatusChange: true});

  const {data: preloaded, loading: preloading} = useQuery(PRELOAD_MESSAGE);

  const {data: updated, loading} = useSubscription(CHAT_UPDATED);

  const [deleteMessage, {data: deleted, loading: deleting}] = useMutation(DELETE_MESSAGE);

  const dispatch = useDispatch();

  useEffect(() => {
    if (preloaded && !preloading) {
      dispatch({type: ACTIONS.MESSAGE_ADDED, payload: { message: preloaded.message } });
    }
  }, [preloaded]);

  useEffect(() => {
    if (updated && !loading) {
      dispatch({type: ACTIONS.MESSAGE_ADDED, payload: { message: updated.chatUpdated.message } });
    }
  }, [updated]);

  return (<ContainerPage title="Chat room">
    <section>
      <MessageList
        active={!loading}
        onDelete= {
          (event: React.MouseEvent<HTMLElement>, id: string) => { deleteMessage({ variables: { id } }); }
      }/>
      <MessageSend
        onSubmit={(variables: IMessageSendForm) => {
          sendMessage({variables});
        }}
        loading={sending}/>
      <p>1 {JSON.stringify(created)}</p>
      <p>2 {JSON.stringify(updated)}</p>
      <p>3 {JSON.stringify(preloaded)}</p>
    </section>
  </ContainerPage>);
};

export default ChatRoom;
