// react libraries
import * as React from 'react';

// pages
import HomePage from 'pages/HomePage';
import LoginPage from 'pages/LoginPage';
import SignupPage from 'pages/SignupPage';

const Routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    exact: true,
  },
  {
    path: '/register',
    name: 'Register',
    component: SignupPage,
    exact: true,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    exact: true,
  },
];

export default Routes;
