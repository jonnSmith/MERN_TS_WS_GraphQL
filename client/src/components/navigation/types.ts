import {RouteString} from "../../misc/enums/routes";
import {ActionsString} from "../../store/actions/types";

interface INavigationData {
    action?: any;
    auth: boolean;
    exact: boolean;
    icon: string;
    id: RouteString | ActionsString;
    label: string;
    payload?: any;
}

export { INavigationData };
