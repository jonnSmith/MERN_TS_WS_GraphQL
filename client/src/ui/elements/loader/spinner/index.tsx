import * as React from "react";
import Loader from "react-loader-spinner";

const LoaderSpinner = () => {
    return (<Loader
        type="Grid"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000}

    />);
};
export { LoaderSpinner };
