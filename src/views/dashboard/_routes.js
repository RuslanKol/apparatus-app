import Dashboard from './';

export default [
  {
    type: 'private',
    path: '/dashboard',
    component: Dashboard,
    exact: true,
    private: true
  }
];
