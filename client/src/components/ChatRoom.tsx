import * as React from "react";
import withAuthorization from './Helpers/Session/withAuthorization';
import SignOutButton from './Authtorization/SignOut';

import "./../assets/scss/ChatRoom.scss";
const className = "chat-room";

const ChatRoom = ({ session }) => (
  <div className={className}>
    <SignOutButton/>
    {session && session.currentUser && <h1>{session.currentUser.firstName} ({session.currentUser.email})</h1>}
  </div>
);

export default withAuthorization(
  session => session && session.currentUser,
)(ChatRoom);
