import { Overlay } from "@react-md/overlay";
import {CircularProgress} from "@react-md/progress";
import * as React from "react";

const LoaderSpinner = () => {
    return <Overlay color="black"
                    style={{backgroundColor: "rgba(0,0,0,0.88)"}}
                    visible={true} id="loading-overlay"
                    onRequestClose={() => { console.debug("request close"); }} >
        <CircularProgress
          id="loading-spinner"
          style={{top: "50%", marginTop: "-5rem", left: "50%" , marginLeft: "-5rem", position: "fixed" }}/>
    </Overlay>;
};
export {LoaderSpinner};
