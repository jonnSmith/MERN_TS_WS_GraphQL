import {StateReturnTypes} from "@appchat/core/store/types";
import {UserInitState} from "@appchat/data/user/constants";
import {IMessageListProps} from "@appchat/ui/elements/message/interfaces";
import {Avatar, AvatarProps} from "@react-md/avatar";
import {FontIcon} from "@react-md/icon";
import {List, ListItem, ListSubheader} from "@react-md/list";
import * as React from "react";
import {useEffect} from "react";
import {useSelector} from "react-redux";

import {ConfigSettings} from "@appchat/core/config";
import {MessageInitObject} from "@appchat/data/message/constants";
import * as moment from "moment";

const MessageList = (props: IMessageListProps) => {
  const {active, callDelete} = props;

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

  return (<List>
    <ListSubheader>Welcome, {user.firstName} {user.lastName} <small>({user.email})</small></ListSubheader>
    <ListItem
      id={`three-line-item-${message.createdAt}`}
      secondaryText={message.text}
      leftAddon={<Avatar color="purple"><FontIcon>comment</FontIcon></Avatar>}
      leftAddonType="avatar"
      rightAddon={(user.id === message.user.id) && <FontIcon onClick={(event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        callDelete({variables: {id: message.id}});
      }}>delete</FontIcon>}
      rightAddonPosition="middle"
      threeLines
    >
      {message.user.email}:
      ({moment.unix(message.createdAt as any / 1000).format(ConfigSettings.client.formats.message.date)})
    </ListItem>
  </List>);
};

export {MessageList};
