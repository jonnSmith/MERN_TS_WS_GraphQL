import {ConfigSettings} from "@appchat/core/config";
import {StateReturnTypes} from "@appchat/core/store/types";
import {IMessageListProps} from "@appchat/ui/templates/message/interfaces";
import {Avatar} from "@react-md/avatar";
import {BadgedButton} from "@react-md/badge";
import {FontIcon} from "@react-md/icon";
import {List, ListItem, ListSubheader} from "@react-md/list";
import * as moment from "moment";
import * as React from "react";
import {useSelector} from "react-redux";
import {CSSTransitionClassNames} from "react-transition-group/CSSTransition";

const MessageList = (props: IMessageListProps) => {
  const {active, callDelete} = props;

  const {user} = useSelector((state: StateReturnTypes) => state.UserReducer);
  const {message} = useSelector((state: StateReturnTypes) => state.MessageReducer);

  return (<List>
    <ListSubheader>Welcome, {user?.firstName} {user?.lastName}&nbsp;<small>({user?.email})</small></ListSubheader>
      <ListItem
        id={`three-line-item-${message.createdAt}`}
        secondaryText={message.text}
        leftAddon={
          <Avatar style={{border: "none"}} color="gray">
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
          disabled={!active}
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            event.preventDefault();
            callDelete({variables: {id: message.id}});
          }}/>
        }
        rightAddonType="icon"
        threeLines
      >
        {message.user.email}:
        ({moment.unix(message.createdAt as any / 1000).format(ConfigSettings.client.formats.message.date)})
      </ListItem>
    </List>);
};

export {MessageList};
