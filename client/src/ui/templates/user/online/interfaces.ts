import {SheetPosition} from "@react-md/sheet";

interface IOnlineUserSheetProps {
  visible?: boolean;
  hide?: () => void;
  position: SheetPosition;
}

interface IOnlineUserButtonProps {
  show: () => void;
}

export {IOnlineUserSheetProps, IOnlineUserButtonProps};
