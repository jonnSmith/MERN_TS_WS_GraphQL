import * as _ from "lodash";
import * as React from "react";
import { Query } from "react-apollo";
import {ISubscriptionInterface} from "../../interfaces/graphql";
import { GET_PAGINATED_MESSAGES } from "../../gql/queries/message";
import { MessageList } from "./list";
import { MoreMessagesButton } from "./more-messages";

const Messages = ({ filter }) => (
  <Query
    query={GET_PAGINATED_MESSAGES}
    variables={{ filter }}
  >
    {({ data, loading, error, fetchMore, subscribeToMore }: ISubscriptionInterface) => {
      const messages = _.get(data, "stream.messages", []);
      if (!messages.length) {
        return (
          <div>
            There are no messages yet ... Try to create one by
            yourself.
          </div>
        );
      }

      if (loading || !messages.length) {
        return "Loading...";
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

export { Messages };
