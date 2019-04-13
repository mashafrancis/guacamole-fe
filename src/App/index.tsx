// react libraries
import * as React from 'react';

// third party libraries
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

// components
import InternalServerErrorMessage from 'components/InternalServerErrorMessage';
import SnackBar from 'components/SnackBar';
import Spinner from 'components/Spinner';
import Routes from '../routes';

// thunk action creators
import { getUserDetails, logoutUser } from 'modules/user';

// styles
import '../assets/scss/textfield.scss';
import { AppProps, AppState } from './interfaces';

// helpers
import { authService } from 'utils/auth';

export class App extends React.Component<AppProps, AppState> {
  state = {
    isGettingUserDetails: true,
    isUserAuthenticated: authService.isAuthenticated(),
    showUnauthorizedUserModal: false,
  };

  async componentDidMount() {
    const { user } = this.props;
    if (this.state.isUserAuthenticated) {
      try {
        await this.props.getUserDetails(user.id);

        this.setState({ isGettingUserDetails: false });
      } catch {
        this.setState({
          isGettingUserDetails: false,
          showUnauthorizedUserModal: true,
        });
      }
    }
  }

  /**
   * This function redirect the user to home page
   *
   * @return {void}
   *
   */
  redirect = () => {
    location.pathname = '/';
  }

  render() {
    const { location } = this.props;
    const { isGettingUserDetails, isUserAuthenticated } = this.state;

    return isGettingUserDetails && isUserAuthenticated
      ? <Spinner />
      : <React.Fragment>
        <SnackBar />
        <>
          {
            location.pathname !== '/'
            && isUserAuthenticated
          }
          { this.props.serverError.error ? <InternalServerErrorMessage /> : <Routes /> }
        </>
      </React.Fragment>;
  }
}

export const mapStateToProps = state => ({
  user: state.user,
  serverError: state.internalServerError,
});

export const mapDispatchToProps = dispatch => ({
  getUserDetails: userId => dispatch(getUserDetails(userId)),
  logoutUser: () => dispatch(logoutUser()),
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(App);
