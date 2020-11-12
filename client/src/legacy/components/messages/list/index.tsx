import * as _ from "lodash";
import * as React from "react";
import { List } from "react-md";
import { IMessageListProps } from "../../../interfaces/components";
import { MESSAGE_UPDATED } from "../../../gql/queries/message";
import { MessageItem } from "../item";

class MessageList extends React.Component<IMessageListProps> {
  public componentDidMount() {
    this.subscribeToMoreMessage();
  }

  public render() {
    const { messages } = this.props;
    return (
      <List>
        {messages.map((message) => (
          <MessageItem
            key={message.id}
            message={message}
            filter={this.props.filter}
          />
        ))}
      </List>
    );
  }

  private subscribeToMoreMessage = () => {
    this.props.subscribeToMore({
      document: MESSAGE_UPDATED,
      updateQuery: (previousResult, { subscriptionData }) => {
        // tslint:disable-next-line:no-console
        console.debug("subscribe!");
        const messages = _.get(
          subscriptionData,
          "data.messageUpdated.messages",
        );
        if (!messages) {
          return previousResult;
        }
        return {
          ...previousResult,
          stream: {
            ...previousResult.stream,
            messages: [...messages],
          },
        };
      },
    });
  }
}

export { MessageList };
