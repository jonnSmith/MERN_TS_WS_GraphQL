import * as React from "react";
import { Card, CardTitle, TextField, CardActions, Button } from 'react-md';
import { withRouter, Redirect }  from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { ROUTES } from '../../constants/routes';
import { SIGN_IN } from '../../queries/user';
import { ErrorMessages } from '../Helpers/Error/ErrorMessage';
import config from './../../../../configs/config.app';

interface SignInProps {
  history: any,
  refetch: any,
  session: any
}

interface SignInFormState {
  email: string,
  password: string;
}

import "./../../assets/scss/SignIn.scss";

const SignInPage = ({ history, refetch, session }) => {
  return (<div className="md-block-centered sign-in">
    <Card>
      <CardTitle title="SignIn" />
      <SignInForm history={history} refetch={refetch} session={session}/>
    </Card>
  </div>)
};


const INITIAL_STATE = {
  email: '',
  password: '',
};

class SignInForm extends React.Component<SignInProps, SignInFormState> {
  componentWillMount() {
    if (this.props.session && this.props.session.currentUser) {
      this.props.history.push(ROUTES.CHAT_ROOM);
    }
    this.setState({...INITIAL_STATE});
  }

  onChange = (value, event) => {
    if (!event) { return; }
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
      localStorage.setItem(config.token.storage, data.token);
      await this.props.refetch();
      this.props.history.push(ROUTES.CHAT_ROOM);
    });
    event.preventDefault();
  };

  componentWillUnmount() {
    this.setState = (state,callback) => {
      return;
    }
  }

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
            <div  className="md-cell md-cell--12">
              {error && error.graphQLErrors && error.graphQLErrors.length && <ErrorMessages errors={error.graphQLErrors}/>}
            </div>
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
          </form>
        )}
      </Mutation>
    );
  }

}

export default withRouter(SignInPage);
export { SignInForm };


