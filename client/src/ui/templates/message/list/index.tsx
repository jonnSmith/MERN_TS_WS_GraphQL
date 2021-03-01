import { ConfigSettings } from "@appchat/core/config";
import { IMessageListProps } from "@appchat/ui/templates/message/interfaces";
import { Avatar, useToggle, BadgedButton, FontIcon, List, ListItem, ListSubheader  } from "react-md";
import * as moment from "moment";
import * as React from "react";
import {useEffect} from "react";
import {useDebouncedCallback} from "use-debounce";
import { CSSTransitionClassNames } from "react-transition-group/CSSTransition";

const MessageList = (props: IMessageListProps) => {
  const {active, callDelete, user, message} = props;
  const [sending, enable, disable] = useToggle(false);

  const deleteMessageItem = () => {
    callDelete({ variables: { id: message.id } }).then((msg) => {
      if(msg?.id) {
        disable();
      }
    });
  };

  const debounced = useDebouncedCallback(deleteMessageItem, ConfigSettings.client.form.debounce.form);
  useEffect(() => () => {
    debounced.flush();
  }, [debounced]);

  return (<List>
    <ListSubheader>Welcome, {user?.firstName} {user?.lastName}&nbsp;<small>({user?.email})</small></ListSubheader>
    <ListItem
      id={`three-line-item-${message.createdAt}`}
      secondaryText={message.text}
      leftAddon={
        <Avatar style={{ border: "none" }} color="gray">
          {(message?.user?.firstName && message?.user?.lastName) ?
            `${message?.user?.firstName.charAt(0).toUpperCase()}${message?.user?.lastName.charAt(0).toUpperCase()}` :
            <FontIcon>messsage</FontIcon>}
        </Avatar>}
      leftAddonType="avatar"
      rightAddon={(user?.id === message.user.id) &&
        <BadgedButton
          disableProgrammaticRipple
          disableRipple
          rippleTimeout={0}
          rippleClassNames={"appear" as CSSTransitionClassNames}
          buttonChildren={<FontIcon>delete</FontIcon>}
          theme={"error"}
          disabled={!active || sending}
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            event.preventDefault();
            enable();
            debounced.callback();
          }} />
      }
      rightAddonType="icon"
      threeLines
    >
      {message.user.email}:
        ({isNaN(+message.createdAt) ?
        moment(message.createdAt).format(ConfigSettings.client.formats.message.date) :
        moment.unix(message.createdAt as any / 1000).format(ConfigSettings.client.formats.message.date)})
      </ListItem>
  </List>);
};

export { MessageList };
