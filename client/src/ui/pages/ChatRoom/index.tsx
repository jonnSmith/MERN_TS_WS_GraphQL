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
  const [sendMessage] = useMutation(CREATE_MESSAGE);
  const [deleteMessage] = useMutation(DELETE_MESSAGE);

  const {user} = useSelector((state: StateReturnTypes) => state.UserReducer);
  const {message} = useSelector((state: StateReturnTypes) => state.MessageReducer);

  const ThrowMessage = async (variables: IMessageSendForm) => {
    const {data} = await sendMessage({variables});
    return data?.message;
  };


  const ClearMessage = async (options: IMessageDeleteOptions) => {
    const {data} = await deleteMessage(options);
    return data?.message;
  };

  return (<ContainerPage title="Chat room">
    <section>
      {message && user && <MessageList
        callDelete={ClearMessage}
        user={user}
        message={message}/>}
      <Divider />
      {user && <MessageSend
        onSubmit={ThrowMessage}
        user={user}/>}
    </section>
  </ContainerPage>);
};

export default ChatRoom;
