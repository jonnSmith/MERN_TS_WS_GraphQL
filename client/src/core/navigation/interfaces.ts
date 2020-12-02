import {RouteString} from "@appchat/core/navigation/types";
import {ActionsString} from "@appchat/core/store/types";

interface INavigationData {
    auth?: boolean;
    active?: boolean;
    exact?: boolean;
    icon: string;
    id: RouteString | ActionsString;
    label: string;
    payload?: any;
    visible?: boolean;
}

export { INavigationData };
