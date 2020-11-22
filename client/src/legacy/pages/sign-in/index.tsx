import * as React from "react";
import {Card, CardTitle} from "react-md";
import {withRouter} from "react-router";
import {SignInForm} from "../../components/forms/sign-in";

const SignInPageComponent = ({ history, refetch, session }) => {
  return (
    <div className="md-block-centered sign-in">
      <Card>
        <CardTitle title="SignIn" />
        <SignInForm history={history} refetch={refetch} session={session}/>
      </Card>
    </div>
  );
};

const SignInPage = withRouter(SignInPageComponent);

export { SignInPage };
