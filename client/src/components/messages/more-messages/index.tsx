import * as React from "react";
import { Button } from "react-md";

const MoreMessagesButton = ({ filter, fetchMore, children }) => (
  <Button
    raised
    primary
    onClick={() =>
      fetchMore({
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return previousResult;
          }

          return {
            messages: fetchMoreResult.messages,
          };
        },
        variables: {
          filter,
        },
      })
    }
  >
    {children}
  </Button>
);

export { MoreMessagesButton };
