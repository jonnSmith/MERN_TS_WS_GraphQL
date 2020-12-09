import {useMutation, useQuery, useSubscription} from "@apollo/react-hooks";
import {ACTIONS} from "@appchat/core/store/constants";
import {CHAT_UPDATED, CREATE_MESSAGE, DELETE_MESSAGE, PRELOAD_MESSAGE} from "@appchat/data/message/queries";
import {ContainerPage} from "@appchat/ui/containers/page";
import {IMessageDeleteOptions} from "@appchat/ui/templates/message/interfaces";
import {IMessageSendForm} from "@appchat/ui/templates/message/interfaces";
import {MessageList} from "@appchat/ui/templates/message/list";
import {MessageSend} from "@appchat/ui/templates/message/send";
import {UserOnlineButton} from "@appchat/ui/templates/user/online/button";
import {UserOnlineSheet} from "@appchat/ui/templates/user/online/sheet";
import {Divider} from "@react-md/divider";
import {useToggle} from "@react-md/utils";
import * as React from "react";

const ChatRoom = () => {
  const [sendMessage,
    {loading: sending}] = useMutation(CREATE_MESSAGE);
  const [deleteMessage,
    {loading: deleting}] = useMutation(DELETE_MESSAGE);
  const [visible, show, hide] = useToggle(false);

  return (<ContainerPage title="Chat room">
    <section>
      <MessageList
        active={!sending && !deleting}
        callDelete={ async (options: IMessageDeleteOptions) => { await deleteMessage(options); }}/>
      <Divider />
      <MessageSend
        onSubmit={(variables: IMessageSendForm) => {
          sendMessage({variables});
        }}
        loading={sending}/>
        <UserOnlineButton show={show} />
        <UserOnlineSheet visible={visible} hide={hide} position={"right"} />
    </section>
  </ContainerPage>);
};

export default ChatRoom;
