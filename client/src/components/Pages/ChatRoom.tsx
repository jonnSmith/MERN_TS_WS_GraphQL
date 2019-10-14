import * as React from "react";
import { Cell, Card, CardTitle, CardActions } from 'react-md';
import withAuthorization from '../Helpers/Session/withAuthorization';
import MessageCreate from '../Messages/MessageCreate';
import Messages from '../Messages/Messages';

import "../../assets/scss/ChatRoom.scss";
const className = "chat-room md-grid";

const filter = {
  limit: 5,
  skip: 0,
  order: 'desc'
};

const ChatRoom = ({ session }) => (
  <div className={className}>
    <Card className="md-cell md-cell--12">
      {session && session.currentUser && <CardTitle title={session.currentUser.firstName + ' (' + session.currentUser.email + ')'} />}
    </Card>
    <Card className="md-cell md-cell--12">
      <Messages filter={filter}/>
    </Card>
    <Card className="md-cell md-cell--12">
      <MessageCreate session={session} filter={filter}/>
    </Card>
  </div>
);

export default withAuthorization(
  session => session && session.currentUser,
)(ChatRoom);
