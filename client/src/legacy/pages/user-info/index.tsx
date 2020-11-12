import * as React from "react";
import { Card, CardTitle, Cell } from "react-md";
import withAuthorization from "../../components/hoc/authorization";

const UserInfo = ({ session }) => (
  <Cell size={12} offset={0}>
    <Card>
      {session && session.currentUser && (
        <CardTitle
          title={
            session.currentUser.firstName +
            " " +
            session.currentUser.lastName +
            ""
          }
        />
      )}
    </Card>
  </Cell>
);

const UserInfoPage =  withAuthorization((session) => session && session.currentUser)(
  UserInfo,
);

export { UserInfoPage };
