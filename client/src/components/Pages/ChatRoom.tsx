import * as React from "react";
import { Cell, Card, CardTitle, CardActions } from 'react-md';
import withAuthorization from '../Helpers/Session/withAuthorization';
import MessageCreate from '../Messages/MessageCreate'

import "../../assets/scss/ChatRoom.scss";
const className = "chat-room md-grid";

const ChatRoom = ({ session }) => (
  <div className={className}>
    <Card className="md-cell md-cell--12">
      {session && session.currentUser && <CardTitle title={session.currentUser.firstName + ' (' + session.currentUser.email + ')'} />}
    </Card>
    <Card className="md-cell md-cell--12">
      <MessageCreate session={session}/>
    </Card>
  </div>
);

export default withAuthorization(
  session => session && session.currentUser,
)(ChatRoom);
