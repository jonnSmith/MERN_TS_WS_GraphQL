import { IUserModel } from "@appchat/data/user/interfaces";
import { ISelectOption } from "@appchat/ui/elements/form/interfaces";
import { SheetPosition } from "@react-md/sheet";
import { ID } from "graphql-ws";

interface ISignInProps {
  onSubmit?: (variables: ISignInForm) => Promise<boolean>;
}

interface ISignInForm {
  email: string;
  password: string;
}

interface ISignUpProps {
  onSubmit?: (variables: ISignInForm) => Promise<boolean>;
}

interface IUpdateForm {
  firstName?: string;
  lastName?: string;
  workspaceId?: string;
}

interface IUpdateProps {
  onSubmit?: (variables: IUpdateForm) => Promise<boolean>;
  user?: IUserModel;
  list?: ISelectOption[];
}

interface ISignUpForm {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  workspaceId: ID;
}

interface IOnlineUserSheetProps {
  visible?: boolean;
  hide?: () => void;
  position: SheetPosition;
}

interface IOnlineUserButtonProps {
  show: () => void;
}

export {
  ISignInProps,
  ISignInForm,
  ISignUpProps,
  ISignUpForm,
  IUpdateProps,
  IUpdateForm,
  IOnlineUserSheetProps,
  IOnlineUserButtonProps
};
