import {StateReturnTypes} from "@appchat/core/store/types";
import {UserInitState} from "@appchat/data/user/constants";
import {IMessageListProps} from "@appchat/ui/elements/message/interfaces";
import * as React from "react";
import {useEffect} from "react";
import {useSelector} from "react-redux";

import {ConfigSettings} from "@appchat/core/config";
import {MessageInitObject} from "@appchat/data/message/constants";
import * as moment from "moment";

const MessageList = (props: IMessageListProps) => {
  const {active} = props;

  const userdata = useSelector((state: StateReturnTypes) => state.UserReducer.user);
  const messagedata = useSelector((state: StateReturnTypes) => state.MessageReducer.message);

  const [message, setMessage] = React.useState(MessageInitObject);
  const [user, setUser] = React.useState(UserInitState.user);

  useEffect(() => {
    if (messagedata) {
      setMessage(messagedata);
    }
    return (): void => {
    };
  }, [active, messagedata]);

  useEffect(() => {
    if (userdata) {
      setUser(userdata);
    }
    return (): void => {
    };
  }, [userdata]);

  return (<div>
            <p>
              {message.user.email}
              ({moment.unix(message.createdAt as any / 1000).format(ConfigSettings.client.formats.message.date)}):
            </p>
            <p>
              {message.text}
            </p>
            <p>
              {user.email} {user.firstName}
            </p>
          </div>);
};

export {MessageList};
