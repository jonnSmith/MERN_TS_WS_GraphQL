import {useMutation} from "@apollo/react-hooks";
import {CREATE_MESSAGE, DELETE_MESSAGE} from "@appchat/data/message/queries";
import {StateReturnTypes} from "@appchat/core/store/types";
import {ContainerPage} from "@appchat/ui/containers/page";
import {IMessageDeleteOptions} from "@appchat/ui/templates/message/interfaces";
import {IMessageSendForm} from "@appchat/ui/templates/message/interfaces";
import {MessageList} from "@appchat/ui/templates/message/list";
import {MessageSend} from "@appchat/ui/templates/message/send";
import {useSelector} from "react-redux";
import {Divider} from "@react-md/divider";
import * as React from "react";

const ChatRoom = () => {
  const [sendMessage,
    {loading: sending}] = useMutation(CREATE_MESSAGE);
  const [deleteMessage,
    {loading: deleting}] = useMutation(DELETE_MESSAGE);

  const user = useSelector((state: StateReturnTypes) => state.UserReducer.user);
  const {message} = useSelector((state: StateReturnTypes) => state.MessageReducer);

  return (<ContainerPage title="Chat room">
    <section>
      {user && message && <MessageList
        active={!sending && !deleting}
        callDelete={ async (options: IMessageDeleteOptions) => { await deleteMessage(options); }}
        user={user}
        message={message}/>}
      <Divider />
      {user && <MessageSend
        onSubmit={(variables: IMessageSendForm) => {
          sendMessage({variables});
        }}
        user={user}
        loading={sending}/>}
    </section>
  </ContainerPage>);
};

export default ChatRoom;
