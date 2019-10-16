import * as React from "react";
import { Card, CardTitle, Grid } from 'react-md';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as _ from 'lodash';

import withAuthorization from '../Helpers/Session/withAuthorization';
import MessageCreate from '../Messages/MessageCreate';
import Messages from '../Messages/Messages';
import { IAppState } from '../../store/Store';
import { IFilter } from '../../reducers/FilterReducer';
import { filterActions } from '../../actions/FilterActions';

import { Query } from 'react-apollo';
import { MESSAGES_COUNT } from '../../queries/message'

import "../../assets/scss/ChatRoom.scss";

const mapStateToProps = (store: IAppState) => {
  return {
    filter: store.filterState.filter,
    count: store.filterState.count,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(filterActions, dispatch)
});

const ChatRoom = ({ session, count, filter, actions }) => {
  const total = _.get(count, 'count.total');
  console.log('total', total);
  console.log('filter', filter);
  console.log('actions', actions);
  return (
    <Grid className="grid-example">
      <Card className="md-cell md-cell--12">
        {session && session.currentUser && <CardTitle title={session.currentUser.firstName + '(' + session.currentUser.email + ')'} />}
      </Card>
      <Card className="md-cell md-cell--12">
        <Messages filter={filter}/>
      </Card>
      <Card className="md-cell md-cell--12">
        <MessageCreate session={session} filter={filter}/>
      </Card>
    </Grid>
  )
};

const MessageCount = (props) => (
  <Query query={MESSAGES_COUNT}>
    { ({ data, refetch }) => {
        return (<ChatRoom {...props} count={data} refetch={refetch} />);
      }
    }
  </Query>
);

const connectChat = connect(
  mapStateToProps,
  mapDispatchToProps
);

const ConnectedChat = connectChat(MessageCount);

export default withAuthorization(
  session => session && session.currentUser,
) (ConnectedChat);
