import * as React from 'react';
import { GraphQLError } from 'graphql';
import { FontIcon, List, ListItem } from 'react-md';
import "../../../assets/scss/ErrorMessage.scss";

type ErrorProps = {
  error: GraphQLError
}


const errorIcon = <FontIcon key="error_outline">error_outline</FontIcon>;

const ErrorMessage: React.FC<ErrorProps> = ({error}) => <ListItem leftIcon={errorIcon} primaryText={error.extensions.code} secondaryText= {error.message} />;

const ErrorMessages = ({errors}) => <List>{errors.filter(e => e).map( (error, i) => <ErrorMessage error={error} key={i} /> )}</List>;

export default ErrorMessage;
export { ErrorMessages };