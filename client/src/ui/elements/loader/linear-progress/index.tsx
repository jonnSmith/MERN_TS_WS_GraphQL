import * as React from "react";
import {LinearProgress} from "react-md";

const LoaderLinearProgress = () => {
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
        let interval: NodeJS.Timeout;
        interval = setInterval(() => {
            setProgress(Math.floor(Math.random() * Math.floor(10)) + 80);
        }, 500);
        return () => {
            clearInterval(interval);
        };
    }, []);
    return (<LinearProgress
        id="GetMeProgress"
        query={true}
        value={progress}
        style={ {top: -14, zIndex: 20, position: "absolute"} }
        centered={true} />);
};

export { LoaderLinearProgress };
