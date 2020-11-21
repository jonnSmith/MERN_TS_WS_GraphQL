import {RouteString} from "core/navigation/types";
import {ActionsString} from "core/store/types";

interface INavigationData {
    auth: boolean;
    active?: boolean;
    exact: boolean;
    icon: string;
    id: RouteString | ActionsString;
    label: string;
    payload?: any;
}

export { INavigationData };
