import {useMutation} from "@apollo/react-hooks";
import {CREATE_MESSAGE} from "@appchat/data/message/queries";
import {ContainerPage} from "@appchat/ui/containers/page";
import {IMessageSendForm} from "@appchat/ui/templates/message/interfaces";
import {MessageSend} from "@appchat/ui/templates/message/send";
import * as React from "react";

const ChatRoom = () => {

    const [sendMessage, {data, loading}] = useMutation(CREATE_MESSAGE);

    React.useLayoutEffect(() => {
        console.debug(data, loading);
    }, [data, loading]);

    return (<ContainerPage title="Chat room">
        <MessageSend onSubmit={(variables: IMessageSendForm) => { sendMessage({variables}); } } />
    </ContainerPage>);
};

export default ChatRoom;
