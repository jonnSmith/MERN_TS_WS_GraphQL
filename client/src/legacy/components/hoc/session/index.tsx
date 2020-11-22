import * as React from "react";
import { Query } from "react-apollo";
import { GET_ME } from "../../../gql/queries/user";

const withSession = (Component) => (props) => (
  <Query query={GET_ME}>
    {({ data, refetch }) => (
      <Component {...props} session={data} refetch={refetch} />
    )}
  </Query>
);

export default withSession;
