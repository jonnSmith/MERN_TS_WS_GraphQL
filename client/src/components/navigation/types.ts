import {RouteString} from "../../misc/enums/routes";
import {ActionsString} from "../../store/actions/types";

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
