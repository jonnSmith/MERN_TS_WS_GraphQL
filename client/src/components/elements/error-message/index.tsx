import { GraphQLError } from "graphql";
import * as React from "react";
import { FontIcon, List, ListItem } from "react-md";

interface IErrorProps {
  error: GraphQLError;
}

const errorIcon = <FontIcon key="error_outline">error_outline</FontIcon>;

const ErrorMessage: React.FC<IErrorProps> = ({error}) =>
  <ListItem leftIcon={errorIcon} primaryText={error.extensions.code} secondaryText= {error.message} />;

const ErrorMessages = ({errors}) =>
  <List>{errors.filter((e) => e).map( (error, i) => <ErrorMessage error={error} key={i} /> )}</List>;

export default ErrorMessage;
export { ErrorMessages };
