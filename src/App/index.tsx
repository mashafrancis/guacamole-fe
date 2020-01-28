// react libraries
import ErrorBoundary from '@components/ErrorBoundary';
import * as React from 'react';

// third party libraries
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

// thunk action creators
import { getUserDetails } from '@modules/user';

// components
import InternalServerErrorMessage from '@components/InternalServerErrorMessage';
import Loader from '@components/Loader';
import SnackBar from '@components/SnackBar';
import Routes from '../routes';

// styles
import '../assets/scss/textfield.scss';
import { AppProps, AppState } from './interfaces';

// helpers
import { authService } from '@utils/auth';
import { initializeGA, logPageView } from '@utils/helpers/googleAnalytics';

export class App extends React.Component<AppProps, AppState> {
  state = {
    isUserAuthenticated: authService.isAuthenticated(),
    isGettingUserDetails: true,
  };

  async componentDidMount() {
    initializeGA();
    logPageView(window.location.pathname);
    // const { user } = this.props;
    const user = authService.getUser();

    if (this.state.isUserAuthenticated) {
      try {
        await this.props.getUserDetails(user.userdata.id);
        this.setState({ isGettingUserDetails: false });

      } catch {
        this.setState({
          isGettingUserDetails: false,
        });
      }
    }
  }

  render() {
    const { isUserAuthenticated, isGettingUserDetails } = this.state;
    const checkUserDetailsAndAuthentication = (
      isGettingUserDetails: boolean,
      isUserAuthenticated: boolean) => (isGettingUserDetails && isUserAuthenticated);

    return (checkUserDetailsAndAuthentication(isGettingUserDetails, isUserAuthenticated) ? <Loader /> :
      <ErrorBoundary>
        <React.Fragment>
          <SnackBar />
          <>
            {
              location.pathname !== '/'
              && isUserAuthenticated
            }
            {<Routes/>}
          </>
        </React.Fragment>
      </ErrorBoundary>
    );
  }
}

export const mapDispatchToProps = dispatch => ({
  getUserDetails: userId => dispatch(getUserDetails(userId)),
});

export const mapStateToProps = state => ({
  serverError: state.internalServerError,
  user: state.user,
});

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(App);
