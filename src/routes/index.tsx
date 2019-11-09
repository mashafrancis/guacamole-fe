// react libraries
import * as React from 'react';

// third party packages
import { Redirect, Route, Switch } from 'react-router-dom';

// pages
import PageNotFound from '@components/PageNotFound';
import ForgotPasswordPage from '@pages/ForgotPasswordPage';
import HomePage from '@pages/HomePage';
import LoginPage from '@pages/LoginPage';
import RegisterPage from '@pages/RegisterPage';
import ResetPasswordPage from '@pages/ResetPasswordPage';
import SocialLoginPage from '@pages/SocialLoginPage';
import SocialRegisterPage from '@pages/SocialRegisterPage';
import DashboardPage from '@pages/DashboardContainer';

const Routes = () => (
  <Route>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/register" component={SocialRegisterPage} />
        <Route exact path="/register/email" component={RegisterPage} />
        <Route exact path="/login" component={SocialLoginPage} />
        <Route exact path="/login/email" component={LoginPage} />
        <Route exact path="/forgot-password" component={ForgotPasswordPage} />
        <Route exact path="/forgot-password/reset" component={ResetPasswordPage} />
        <Route exact path="/dashboard" component={DashboardPage} />
        <Route path="/404" component={PageNotFound} />
        <Redirect to="/404" />
      </Switch>
  </Route>
);

export default Routes;
