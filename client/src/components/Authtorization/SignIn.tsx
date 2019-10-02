import * as React from "react";
import { Card, CardTitle, TextField, CardActions, Button } from 'react-md';
import { withRouter }  from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { ROUTES } from '../../constants/routes';
import ErrorMessage from '../Helpers/Error/ErrorMessage';
import {SIGN_IN} from '../../queries/user';
import config from './../../../../configs/config.app';

interface SignInProps {
  history: any,
  refetch: any
}

interface SignInFormState {
  email: string,
  password: string;
}

import "./../../assets/scss/SignIn.scss";

const SignInPage = ({ history, refetch }) => (
  <div className="md-block-centered sign-in">
    <Card>
      <CardTitle title="SignIn" />
      <SignInForm history={history} refetch={refetch} />
    </Card>
  </div>
);


const INITIAL_STATE = {
  email: '',
  password: '',
};

class SignInForm extends React.Component<SignInProps, SignInFormState> {
  componentWillMount() {
    this.setState({...INITIAL_STATE});
  }

  onChange = (value, event) => {
    switch(event.target.id) {
      case 'email': {
        this.setState({ email: value });
        break;
      }
      case 'password': {
        this.setState({ password: value });
        break;
      }
    }
  };

  onSubmit = (event, signIn) => {
    signIn().then(async ({ data }) => {
      this.setState({ ...INITIAL_STATE });
      localStorage.setItem(config.token.storage, data.loginUser);
      await this.props.refetch();
      this.props.history.push(ROUTES.CHAT_ROOM);
    });
    event.preventDefault();
  };

  public render() {
    const { email, password } = this.state;
    const isInvalid = password === '' || email === '';
    return (
      <Mutation mutation={SIGN_IN} variables={{ email, password }}>
        {(signIn, { data, loading, error }) => (
          <form className="md-grid text-fields__application" onSubmit={event => this.onSubmit(event, signIn)}>
            <TextField
              id="email"
              name="email"
              value={email}
              onChange={this.onChange}
              type="text"
              label="Email or Username"
              className="md-cell md-cell--12"
            />
            <TextField
              id="password"
              name="password"
              value={password}
              onChange={this.onChange}
              type="password"
              label="Password"
              className="md-cell md-cell--12"
            />
            <CardActions className="md-cell md-cell--12">
              <Button
                raised
                primary
                className="md-cell--right"
                disabled={isInvalid || loading}
                type="submit">
                Sign In
              </Button>
            </CardActions>
            {error}
            {/*{error && <ErrorMessage error={error} />}*/}
          </form>
        )}
      </Mutation>
    );
  }

}

export default withRouter(SignInPage);
export { SignInForm };


