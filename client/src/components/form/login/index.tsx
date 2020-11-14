import * as React from "react";
import {Button, CardActions, TextField} from "react-md";
import {ErrorMessages} from "../../../legacy/components/elements/error-message";

const LoginForm: React.FC = (props) => {

    const { error } = props;

    return (<form
        className="md-grid text-fields__application"
        onSubmit={(event) => { console.debug("submit"); }}
    >
        <TextField
            id="email"
            name="email"
            value={undefined}
            onChange={ () => console.debug("change") }
            type="text"
            label="Email or Username"
            className="md-cell md-cell--12"
        />
        <TextField
            id="password"
            name="password"
            value={undefined}
            onChange={ () => console.debug("change") }
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
                disabled={false}
                type="submit"
            >
                Sign In
            </Button>
        </CardActions>
    </form>);
};

export { LoginForm };
