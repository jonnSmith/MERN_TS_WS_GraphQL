import * as React from "react";
import {Card, CardTitle} from "react-md";
import {withRouter} from "react-router";
import {SignUpForm} from "../../components/forms/sign-up";

const SignUpPageComponent = ({ history, refetch, session }) => (
  <div className="md-block-centered sign-up">
    <Card>
      <CardTitle title="Register" />
      <SignUpForm history={history} refetch={refetch} session={session} />
    </Card>
  </div>
);

// @ts-ignore
const SignUpPage = withRouter(SignUpPageComponent);

export { SignUpPage };
