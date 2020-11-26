import {ContainerPage} from "@appchat/ui/containers/page";
import {MessageSend} from "@appchat/ui/templates/message/send";
import * as React from "react";

const ChatRoom = () => {
    return (<ContainerPage title="Chat room">
        <MessageSend />
    </ContainerPage>);
};

export default ChatRoom;
