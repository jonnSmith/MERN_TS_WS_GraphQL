import * as React from "react";
import { Query } from 'react-apollo';
import MessageDelete from './MessageDelete';
import withSession from '../Helpers/Session/withSession';
import { GET_PAGINATED_MESSAGES, MESSAGE_UPDATED } from '../../queries/message';
import { List, ListItem, Button } from 'react-md';
import { ErrorMessages } from '../Helpers/Error/ErrorMessage';
import * as _ from 'lodash';
import * as moment from 'moment';

const Messages = ({ filter }) => (
  <Query
    query={GET_PAGINATED_MESSAGES}
    variables={{ filter }}
  >
    {({ data, loading, error, fetchMore, subscribeToMore }) => {
      const messages = _.get(data, 'stream.messages', []);
      if (!messages.length) {
        return (
          <div>
            There are no messages yet ... Try to create one by
            yourself.
          </div>
        );
      }

      if (loading || !messages.length) {
        return 'Loading...';
      }

      return (
        <React.Fragment>
          <MessageList
            messages={messages}
            subscribeToMore={subscribeToMore}
            filter={filter}
          />
          <MoreMessagesButton
            filter={filter}
            fetchMore={fetchMore}
          >More</MoreMessagesButton>

        </React.Fragment>
      );
    }}
  </Query>
);

const MoreMessagesButton = ({
    filter,
    fetchMore,
    children,
  }) => (
  <Button
    raised
    primary
    onClick={() =>
      fetchMore({
        variables: {
          filter: filter
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return previousResult;
          }

          return {
            messages: fetchMoreResult.messages
          };
        },
      })
    }
  >
    {children}
  </Button>
);

interface MessageListProps {
  subscribeToMore: any,
  messages: any
  filter: any
}

class MessageList extends React.Component<MessageListProps> {
  subscribeToMoreMessage = () => {
    this.props.subscribeToMore({
      document: MESSAGE_UPDATED,
      updateQuery: (previousResult, { subscriptionData }) => {
        console.debug('subscriptionData', subscriptionData);
        const messages = _.get(subscriptionData ,'data.messageUpdated.messages');
        if (!messages) {
          return previousResult;
        }
        return {
          ...previousResult,
          stream: {
            ...previousResult.stream,
            messages: [
              ...messages,
            ],
          },
        };
      },
    });
  };

  componentDidMount() {
    this.subscribeToMoreMessage();
  }

  render() {
    const { messages } = this.props;
    return <List>{ messages.map(message => (<MessageItem key={message.id} message={message} filter={this.props.filter} />)) }</List>
  }
}

const MessageItemBase = ({ message, session, filter }) => (
  <ListItem
    primaryText={message.user.email}
    secondaryText={message.text + ' (' + moment.unix(message.createdAt/1000).format('YYYY/MM/DD, H:mm') + ') '}

    rightIcon={session && session.currentUser &&
    message.user.id === session.currentUser.id && (
      <MessageDelete message={message} filter={filter} />
    )}
  />
);

const MessageItem = withSession(MessageItemBase);

export default Messages;