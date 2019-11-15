// react libraries
import * as React from 'react';

// third party packages
import { Redirect, Route, Switch } from 'react-router-dom';

// pages
import PageNotFound from '@components/PageNotFound';
import EditSingleTripPage from '@pages/EditSingleTripPage';
import ExplorePage from '@pages/ExplorePage';
import ForgotPasswordPage from '@pages/ForgotPasswordPage';
import HomePage from '@pages/HomePage';
import LoginPage from '@pages/LoginPage';
import PreferencePage from '@pages/PreferencePage';
import RegisterPage from '@pages/RegisterPage';
import ResetPasswordPage from '@pages/ResetPasswordPage';
import SingleTripPage from '@pages/SingleTripPage';
import SocialLoginPage from '@pages/SocialLoginPage';
import SocialRegisterPage from '@pages/SocialRegisterPage';
import TripsPage from '@pages/TripsPage';
import TripsPageForm from '@pages/TripsPageForm';

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
        <Route exact path="/explore" component={ExplorePage} />
        <Route exact path="/trips" component={TripsPage} />
        <Route exact path="/preferences" component={PreferencePage} />
        <Route exact path="/trips/new-trip" component={TripsPageForm} />
        <Route exact path="/trips/edit/:id" component={EditSingleTripPage} />
        <Route exatc path="/trips/:id" component={SingleTripPage} />
        <Route path="/404" component={PageNotFound} />
        <Redirect to="/404" />
      </Switch>
  </Route>
);

export default Routes;
