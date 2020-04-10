export interface ISignInFormState {
  email: string;
  password: string;
}

export interface ISignUpFormState {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface IMessageListProps {
  subscribeToMore: any;
  messages: any;
  filter: any;
}
