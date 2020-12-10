import {ISignInForm, ISignUpForm, IUpdateForm} from "@appchat/ui/templates/user/interfaces";

const checkFields = (formFields: ISignInForm | ISignUpForm | IUpdateForm) =>
  Object.keys(formFields).some((key: keyof typeof formFields) => !formFields[key]);

export {checkFields};
