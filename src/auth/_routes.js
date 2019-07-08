import Login from 'auth/Login';
import LoginMagicLink from 'auth/LoginMagicLink';
import Logout from 'auth/Logout';

export default [
  {
    type: 'unauth',
    path: '/login/:token',
    component: LoginMagicLink,
    exact: true
  },
  {
    type: 'unauth',
    path: '/login',
    component: Login,
    exact: true
  },
  {
    type: 'private',
    path: '/logout',
    component: Logout,
    exact: true
  }
];
