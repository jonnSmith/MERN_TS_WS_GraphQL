import * as _ from "lodash";
import * as React from "react";
import { Card, CardTitle, Grid } from "react-md";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import withAuthorization from "../../components/hoc/authorization";
import { Messages } from "../../components/messages";
import { MessageCreate } from "../../components/messages/create";
import { IAppState } from "../../store";
import { filterActions } from "../../store/actions/filter";

import { Query } from "react-apollo";
import { MESSAGES_COUNT } from "../../queries/message";

const mapStateToProps = (store: IAppState) => {
  return {
    count: store.filterState.count,
    filter: store.filterState.filter,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(filterActions, dispatch),
});

const ChatRoom = ({ session, count, filter, actions }) => {
  const total = _.get(count, "count.total");
  return (
    <Grid className="grid-example">
      <Card className="md-cell md-cell--12">
        {session && session.currentUser && (
          <CardTitle
            title={
              session.currentUser.firstName +
              "(" +
              session.currentUser.email +
              ")"
            }
          />
        )}
      </Card>
      <Card className="md-cell md-cell--12">
        <Messages filter={filter} />
      </Card>
      <Card className="md-cell md-cell--12">
        <MessageCreate session={session} filter={filter} />
      </Card>
    </Grid>
  );
};

const MessageCount = (props) => (
  <Query query={MESSAGES_COUNT}>
    {({ data, refetch }) => {
      return <ChatRoom {...props} count={data} refetch={refetch} />;
    }}
  </Query>
);

const ChatRoomPage = withAuthorization((session) => session && session.currentUser)(connect(
  mapStateToProps, mapDispatchToProps)(MessageCount),
);

export { ChatRoomPage };
