import { signOut } from '../components/Authtorization/SignOut';

export enum ROUTES {
  CHAT_ROOM = '/chat',
  SIGN_UP = '/register',
  SIGN_IN = '/',
  USER_INFO = '/account'
}

export const navItems = [{
  exact: true,
  label: 'Sign In',
  to: ROUTES.SIGN_IN,
  action: null,
  icon: 'person',
  auth: false
}, {
  exact: true,
  label: 'Sign Up',
  to: ROUTES.SIGN_UP,
  action: null,
  icon: 'person_add',
  auth: false
}, {
  exact: true,
  label: 'Chat Room',
  to: ROUTES.CHAT_ROOM,
  action: null,
  icon: 'chat',
  auth: true
}, {
  exact: true,
  label: 'User Info',
  to: ROUTES.USER_INFO,
  action: null,
  icon: 'account_box',
  auth: true
},
{
  exact: true,
  label: 'Sign Out',
  to: null,
  action: signOut,
  icon: 'exit_to_app',
  auth: true
}];