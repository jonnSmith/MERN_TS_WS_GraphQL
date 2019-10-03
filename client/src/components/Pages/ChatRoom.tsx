import * as React from "react";
import { Cell, Card, CardTitle, CardActions } from 'react-md';
import withAuthorization from '../Helpers/Session/withAuthorization';

import "../../assets/scss/ChatRoom.scss";
const className = "chat-room";

const ChatRoom = ({ session }) => (
  <Cell size={12} offset={0} className={className}>
    <Card>
      {session && session.currentUser && <CardTitle title={session.currentUser.firstName + ' (' + session.currentUser.email + ')'} />}
      <CardActions>

      </CardActions>
    </Card>
  </Cell>
);

export default withAuthorization(
  session => session && session.currentUser,
)(ChatRoom);
