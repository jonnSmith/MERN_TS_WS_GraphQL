import * as React from "react";
import { Mutation } from "react-apollo";
import { Button, CardActions, TextField } from "react-md";
import { SIGN_UP_INITIAL_STATE } from "../../../constants/components";
import { ROUTES } from "../../../constants/routes";
import { ISignUpFormState } from "../../../interfaces/components";
import { IMutationInterface} from "../../../interfaces/graphql";
import { IWithRouterProps } from "../../../interfaces/router";
import { SIGN_UP } from "../../../gql/queries/user";
import { ErrorMessages } from "../../elements/error-message";
import config from "./../../../../../configs/config.app";

const INITIAL_STATE = {
  email: "",
  firstName: "",
  lastName: "",
  password: "",
};

class SignUpForm extends React.Component<IWithRouterProps, ISignUpFormState> {
  public componentWillMount() {
    if (this.props.session && this.props.session.currentUser) {
      this.props.history.push(ROUTES.CHAT_ROOM);
    }
    this.setState({ ...SIGN_UP_INITIAL_STATE });
  }

  public componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  public render() {
    const { email, password, firstName, lastName } = this.state;
    const isInvalid = password === "" || email === "" || firstName === "";
    return (
      <Mutation
        mutation={SIGN_UP}
        variables={{ email, password, firstName, lastName }}
      >
        {(signUp, { data, loading, error }: IMutationInterface) => (
          <form
            className="md-grid text-fields__application"
            onSubmit={(event) => this.onSubmit(event, signUp)}
          >
            <TextField
              id="email"
              name="email"
              value={email}
              onChange={this.onChange}
              type="email"
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
            <TextField
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={this.onChange}
              type="text"
              label="firstName"
              className="md-cell md-cell--12"
            />
            <TextField
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={this.onChange}
              type="text"
              label="lastName"
              className="md-cell md-cell--12"
            />
            <div className="md-cell md-cell--12">
              {error && error.graphQLErrors && error.graphQLErrors.length && (
                <ErrorMessages errors={error.graphQLErrors} />
              )}
            </div>
            <CardActions className="md-cell md-cell--12">
              <Button
                raised
                secondary
                className="md-cell--right"
                disabled={isInvalid || loading}
                type="submit"
              >
                Sign Up
              </Button>
            </CardActions>
          </form>
        )}
      </Mutation>
    );
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
      case "firstName": {
        this.setState({ firstName: value });
        break;
      }
      case "lastName": {
        this.setState({ lastName: value });
        break;
      }
    }
  }

  private onSubmit = (event, signUp) => {
    signUp().then(async ({ data }) => {
      // this.setState({ ...SIGN_UP_INITIAL_STATE });
      localStorage.setItem(config.token.storage, data.token);
      await this.props.refetch();
      this.props.history.push(ROUTES.CHAT_ROOM);
    });
    event.preventDefault();
  }
}

export { SignUpForm };
