import {IContainerPage} from "@appchat/ui/containers/interfaces";
import * as React from "react";
import {Card, CardText, CardTitle} from "react-md";

const ContainerPage = (props: IContainerPage): React.ReactElement => {
    const { children, title, className } = props;
    return (<div className={`md-block-centered ${className}`}>
        <Card>
            <CardTitle title={title} />
            <CardText>{children}</CardText>
        </Card>
    </div>);
};

export {ContainerPage};
