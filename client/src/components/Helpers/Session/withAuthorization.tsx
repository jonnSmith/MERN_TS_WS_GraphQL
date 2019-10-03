import * as React from "react";
import { Query } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import { GET_ME } from '../../../queries/user';
import { ROUTES } from "../../../constants/routes";

const withAuthorization = conditionFn => Component => props => (
  <Query query={GET_ME}>
    {({ data, networkStatus, refetch }) => {
      if (networkStatus < 7) {
        return null;
      }
      return conditionFn(data) ? (
        <Component {...props} session={data} refetch={refetch} />
      ) : (
        <Redirect to={ROUTES.SIGN_IN} />
      );
    }}
  </Query>
);

export default withAuthorization;