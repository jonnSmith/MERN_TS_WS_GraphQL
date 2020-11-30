import {useMutation, useSubscription} from "@apollo/react-hooks";
import {CHAT_UPDATED, CREATE_MESSAGE} from "@appchat/data/message/queries";
import {ContainerPage} from "@appchat/ui/containers/page";
import {IMessageSendForm} from "@appchat/ui/templates/message/interfaces";
import {MessageSend} from "@appchat/ui/templates/message/send";
import * as React from "react";

const ChatRoom = () => {

    const [sendMessage, {loading}] = useMutation(CREATE_MESSAGE);
    const {data, loading: sockloading, error } =
        useSubscription(CHAT_UPDATED);

    return (<ContainerPage title="Chat room">
        <div>
            <MessageSend onSubmit={(variables: IMessageSendForm) => { sendMessage({variables}); } } />
            <p>
                {loading ? <b>loading</b> : null}<br/>
                {JSON.stringify(error)}<br/>
                {sockloading ? <b>loading</b> : null}<br/>
                {JSON.stringify(data)}</p>
        </div>
    </ContainerPage>);
};

export default ChatRoom;
