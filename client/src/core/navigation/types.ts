import {ROUTES} from "@appchat/core/navigation/enums";

type RouteString = keyof typeof ROUTES;

type INavigationPathsSecurity = {
    [key in keyof typeof ROUTES]: boolean;
};

export { RouteString, INavigationPathsSecurity };
