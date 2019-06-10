import * as React from 'react';

// third-party libraries
import { connect } from 'react-redux';

// thunks
import { logoutUser } from 'modules/user';

// pages
import DashboardNavBar from 'pages/DashboardNavBar';

// interfaces
import { DashboardPageProps } from './interfaces';

// styles
import './DashboardPage.scss';

export class DashboardPage extends React.Component<DashboardPageProps> {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
  }
  logoutUser = () => {
    this.props.logoutUser();
    window.location.replace('/');
  }

  render() {
    const { user, component } = this.props;
    return (
      <DashboardNavBar
        component={component}
        user={user}
        logoutUser={this.logoutUser}
      />
    );
  }
}

export const mapStateToProps = state => ({
  user: state.user,
});

export const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
