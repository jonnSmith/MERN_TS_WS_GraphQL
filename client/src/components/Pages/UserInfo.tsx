import * as React from "react";
import { Cell, Card, CardTitle } from 'react-md';
import withAuthorization from '../Helpers/Session/withAuthorization';

import "../../assets/scss/UserInfo.scss";
const className = "user-info";

const UserInfo = ({ session }) => (
  <Cell size={12} offset={0} className={className}>
    <Card>
      {session && session.currentUser && <CardTitle title={session.currentUser.firstName + ' ' + session.currentUser.lastName + ''} />}
    </Card>
  </Cell>
);

export default withAuthorization(
  session => session && session.currentUser,
)(UserInfo);
