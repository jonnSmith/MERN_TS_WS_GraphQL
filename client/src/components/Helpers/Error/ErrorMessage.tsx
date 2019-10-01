import * as React from 'react';
import {hot} from "react-hot-loader";
import "./../../../assets/scss/ErrorMessage.scss";

interface ErrorProps {
  error: {
    message: string;
    type?: string;
  }
}

const ErrorMessage: React.FC<ErrorProps> = ({ error }) => <div className={error.type}><small>{ error.message }</small></div>;

declare let module: object;
export default hot(module)(ErrorMessage);
export { ErrorProps };