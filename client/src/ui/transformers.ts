import {ISignInForm, ISignUpForm, IUpdateForm} from "@appchat/ui/templates/user/interfaces";
import {IWorkspaceCreateForm} from "@appchat/ui/templates/workspace/interfaces";

const checkFields = (formFields: ISignInForm | ISignUpForm | IUpdateForm | IWorkspaceCreateForm) =>
  Object.keys(formFields).filter((f) => f !== "workspaceId").some((key: keyof typeof formFields) => !formFields[key]);

export {checkFields};
