import {useMutation} from "@apollo/react-hooks";
import {StateReturnTypes} from "@appchat/core/store/types";
import {DELETE_MESSAGE} from "@appchat/data/message/queries";
import {UserInitState} from "@appchat/data/user/constants";
import {IMessageListProps} from "@appchat/ui/elements/message/interfaces";
import {MessagesListItem} from "@appchat/ui/elements/message/item";
import * as React from "react";
import {useEffect} from "react";
import {List} from "react-md";
import {useSelector} from "react-redux";

import {config} from "@appchat/core/config";
import {MessageInitObject} from "@appchat/data/message/constants";
import {IMessageModel} from "@appchat/data/message/interfaces";
import * as moment from "moment";
import {
  DataTable,
  TableBody,
  TableColumn,
  TableHeader,
  TableRow,
} from "react-md";

const MessageList = (props: IMessageListProps) => {
  const {active, onDelete} = props;

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

  return (<DataTable plain>
    <TableHeader>
      <TableRow>
        <TableColumn>Message</TableColumn>
        <TableColumn>User</TableColumn>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow key={message.id} selectable={false}>
        <TableColumn>
          <p>
            {message.user.email}
            ({moment.unix(message.createdAt as any / 1000).format(config.client.formats.message.date)}):
          </p>
          <p>{message.text}</p>
        </TableColumn>
        <TableColumn>
          {user.email} {user.firstName}
        </TableColumn>
      </TableRow>
    </TableBody>
  </DataTable>
);
};

export {MessageList};
