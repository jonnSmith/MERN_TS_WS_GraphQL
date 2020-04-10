import * as React from "react";
import { Mutation } from "react-apollo";
import { Button, CardActions, TextField } from "react-md";
import { SIGN_IN_INITIAL_STATE } from "../../../constants/components";
import { ROUTES } from "../../../constants/routes";
import { ISignInFormState } from "../../../interfaces/components";
import { IMutationInterface} from "../../../interfaces/graphql";
import { IWithRouterProps } from "../../../interfaces/router";
import { SIGN_IN } from "../../../queries/user";
import { ErrorMessages } from "../../elements/error-message";
import config from "./../../../../../configs/config.app";

class SignInForm extends React.Component<IWithRouterProps, ISignInFormState> {
  public componentWillMount() {
    if (this.props.session && this.props.session.currentUser) {
      this.props.history.push(ROUTES.CHAT_ROOM);
    }
    this.setState({ ...SIGN_IN_INITIAL_STATE });
  }

  public componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  public render() {
    const { email, password } = this.state;
    const isInvalid = password === "" || email === "";

    return <Mutation mutation={SIGN_IN} variables={{email, password}}>
      {(signIn, {data, loading, error}: IMutationInterface) => (
        <form
          className="md-grid text-fields__application"
          onSubmit={(event) => this.onSubmit(event, signIn)}
        >
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
          <div className="md-cell md-cell--12">
            {error && error.graphQLErrors && error.graphQLErrors.length && (
              <ErrorMessages errors={error.graphQLErrors}/>
            )}
          </div>
          <CardActions className="md-cell md-cell--12">
            <Button
              raised
              primary
              className="md-cell--right"
              disabled={isInvalid || loading}
              type="submit"
            >
              Sign In
            </Button>
          </CardActions>
        </form>
      )}
    </Mutation>;
  }

  private onChange = (value, event) => {
    if (!event) {
      return;
    }
    switch (event.target.id) {
      case "email": {
        this.setState({ email: value });
        break;
      }
      case "password": {
        this.setState({ password: value });
        break;
      }
    }
  }

  private onSubmit = (event, signIn) => {
    signIn().then(async ({ data }) => {
      this.setState({ ...SIGN_IN_INITIAL_STATE });
      localStorage.setItem(config.token.storage, data.token);
      await this.props.refetch();
      this.props.history.push(ROUTES.CHAT_ROOM);
    });
    event.preventDefault();
  }
}

export { SignInForm };
