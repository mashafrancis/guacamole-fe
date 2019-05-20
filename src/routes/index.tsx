// react libraries
import * as React from 'react';

// third party packages
import { Redirect, Route, Switch } from 'react-router-dom';

// pages
import PageNotFound from 'components/PageNotFound';
import AddNewPasswordPage from 'pages/AddNewPasswordPage';
import HomePage from 'pages/HomePage';
import LoginPage from 'pages/LoginPage';
import RegisterPage from 'pages/RegisterPage';
import ResetPasswordPage from 'pages/ResetPasswordPage';

const Routes = () => (
  <Route>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/reset-password" component={ResetPasswordPage} />
        <Route exact path="/new-password" component={AddNewPasswordPage} />
        <Route path="/404" component={PageNotFound} />
        <Redirect to="/404" />
      </Switch>
  </Route>
);

export default Routes;
