// react libraries
import Spinner from 'components/Spinner';
import * as React from 'react';

// third party libraries
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

// thunk action creators
import { getUserDetails } from 'modules/user';

// components
import InternalServerErrorMessage from 'components/InternalServerErrorMessage';
import SnackBar from 'components/SnackBar';
import Routes from '../routes';

// styles
import '../assets/scss/textfield.scss';
import { AppProps, AppState } from './interfaces';

// helpers
import { authService } from 'utils/auth';

export class App extends React.Component<AppProps, AppState> {
  state = {
    isUserAuthenticated: authService.isAuthenticated(),
    isGettingUserDetails: true,
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
        });
      }
    }
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

export const mapDispatchToProps = dispatch => ({
  getUserDetails: userId => dispatch(getUserDetails(userId)),
});

export const mapStateToProps = state => ({
  serverError: state.internalServerError,
  user: state.user,
});

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(App);
