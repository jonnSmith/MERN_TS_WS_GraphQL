import {ACTIONS} from "@appchat/core/store/constants";
import {StateReturnTypes} from "@appchat/core/store/types";
import {IOnlineUserData} from "@appchat/data/user/interfaces";
import {IOnlineUserSheetProps} from "@appchat/ui/templates/user/online/interfaces";
import {Avatar} from "@react-md/avatar";
import {List, ListItem, ListSubheader} from "@react-md/list";
import {Sheet} from "@react-md/sheet";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";

const UserOnlineSheet = (SheetProps: IOnlineUserSheetProps) => {
  const {position} = SheetProps;
  const {list} = useSelector((state: StateReturnTypes) => state.OnlineUserListReducer);
  const {open, action} = useSelector((state: StateReturnTypes) => state.OnlineUserPanelReducer);

  const dispatch = useDispatch();

  const hide = () => {
    dispatch({type: ACTIONS.ONLINE_TOGGLE, payload: { open: false, type: ACTIONS.ONLINE_CLOSE}});
  };

  return <Sheet
    id="online-user-sheet"
    aria-label="Online users"
    visible={open}
    onRequestClose={hide}
    position={position}
  >
    <List onClick={hide}>
      <ListSubheader>Online users</ListSubheader>
      {list.map( (user: IOnlineUserData) =>
        <ListItem
          leftAddon={<Avatar
            style={{border: "none", height: "10px", width: "10px", marginRight: "10px"}}
            color="green" />}
          key={`user-${user.email}`}
          id={`online-user-${user.email}`}>{user.email}</ListItem>)
      }
    </List>
  </Sheet>;
};

export {UserOnlineSheet};
