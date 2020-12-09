import {StateReturnTypes} from "@appchat/core/store/types";
import {IOnlineUserData} from "@appchat/data/user/interfaces";
import {IOnlineUserSheetProps} from "@appchat/ui/templates/user/online/interfaces";
import {List, ListItem, ListSubheader} from "@react-md/list";
import {Sheet} from "@react-md/sheet";
import * as React from "react";
import {useSelector} from "react-redux";

const UserOnlineSheet = (SheetProps: IOnlineUserSheetProps) => {
  const {visible, hide, position} = SheetProps;

  const list = useSelector((state: StateReturnTypes) => state.OnlineUserListReducer.list);

  return <Sheet
    id="online-user-sheet"
    aria-label="Online users"
    visible={visible}
    onRequestClose={hide}
    position={position}
  >
    <List onClick={hide}>
      <ListSubheader>Online users</ListSubheader>
      {list.map( (user: IOnlineUserData) =>
        <ListItem key={`user-${user.email}`} id={`online-user-${user.email}`}>{user.email}</ListItem>)
      }
    </List>
  </Sheet>;
};

export {UserOnlineSheet};
