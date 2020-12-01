import {IContainerPage} from "@appchat/ui/containers/interfaces";
import * as React from "react";
import {Card, CardContent, CardTitle} from "react-md";

const ContainerPage = (props: IContainerPage): React.ReactElement => {
    const { children, title } = props;
    return <Card fullWidth>
            <CardTitle title={title} />
            <CardContent>{children}</CardContent>
        </Card>;
};

export {ContainerPage};
