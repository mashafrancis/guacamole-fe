import { Fragment } from 'react';
import * as React from 'react';
import { connect } from 'react-redux';

// third-party libraries
import { NavLink } from 'react-router-dom';

// thunk
import { logoutUser } from 'modules/user';

// interfaces
import { HomePageProps, HomePageState } from 'pages/HomePage/interfaces';

// components
import HomeHeader from 'components/HomeAuthHeader';

// styles
import './HomePage.scss';
import { authService } from 'utils/auth';

export class HomePage extends React.Component<HomePageProps, HomePageState> {
  state = {
    isLoading: true,
  };

  renderJoinCommunity = () => (
    <React.Fragment>
      <NavLink to={'/register'}>
        <button className="mdc-button mdc-button--raised">
          <span className="mdc-button__label">Join our community</span>
        </button>
      </NavLink>
    </React.Fragment>
  )

  renderGoToDashboard = () => (
    <React.Fragment>
      <NavLink to={'/profile'}>
        <button className="mdc-button mdc-button--raised">
          <span className="mdc-button__label">Go to dashboard</span>
        </button>
      </NavLink>
    </React.Fragment>
  )

  render = () => {
    return (
      <div>
        <header className="carryforme-nav mdc-top-app-bar">
          <div className="mdc-top-app-bar__row">
            <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
              <span className="mdc-top-app-bar__title">
                  <NavLink to={'/'} className="router-link-exact-active mdc-tab--active">kari4me</NavLink>
              </span>
              <div className="mdc-tab-scroller mdc-tab-scroller--align-center carryforme-navigation">
                <div className="mdc-tab-scroller__scroll-area mdc-tab-scroller__scroll-area--scroll">
                  <div className="mdc-tab-scroller__scroll-content">
                    <a href="/" className="mdc-tab" role="menuitem">
                      <span className="mdc-tab__content">
                          <span className="mdc-tab__text-label">How it works</span>
                      </span>
                      <span className="mdc-tab-indicator">
                        <span className="mdc-tab-indicator__content mdc-tab-indicator__content--underline"/>
                      </span>
                      <span className="mdc-tab__ripple"/>
                    </a>
                  </div>
                  </div>
                </div>
            </section>
              <section role="toolbar"
                       className="mdc-top-app-bar__section mdc-top-app-bar__section--align-end user-info__content">
                <HomeHeader logoutUser={this.props.logoutUser}/>
              </section>
            </div>
          </header>
      <section id="hero">
        <div id="particles-js" className="hero-container">
          <div className="hero-info">
              <h1>You Fly, We Connect</h1>
              <h2>Fly anywhere and share your space.</h2>
            { authService.isAuthenticated() ? this.renderGoToDashboard() : this.renderJoinCommunity() }
          </div>
        </div>
      </section>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  user: state.authentication.user,
});

export const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser()),
});

// export default HomePage;
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
