import * as React from "react";
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

const className = "sign-in";

const SignInPage = ({ history, refetch }) => (
  <div className={className}>
    <h1>SignIn</h1>
    <SignInForm history={history} refetch={refetch} />
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

  onChange = event => {
    const { name, value } = event.target;
    switch(name) {
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
          <form onSubmit={event => this.onSubmit(event, signIn)}>
            <input
              name="email"
              value={email}
              onChange={this.onChange}
              type="text"
              placeholder="Email or Username"
            />
            <input
              name="password"
              value={password}
              onChange={this.onChange}
              type="password"
              placeholder="Password"
            />
            <button disabled={isInvalid || loading} type="submit">
              Sign In
            </button>
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


