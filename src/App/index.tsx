// react libraries
import * as React from 'react';

// third party libraries
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

// interfaces
import { AppProps, AppState } from './interfaces';

export class App extends React.Component<AppProps, AppState> {

  render() {
    return (
        <div>
          <p>
            You are currently not authorised to access Kari4me.
            Please contact kari4me@gmail.com for more details
          </p>
        </div>
    );
  }
}

export const mapStateToProps = state => ({
  user: state.user,
  serverError: state.internalServerError,
});

export default compose(
  withRouter,
  connect(mapStateToProps)
)(App);
