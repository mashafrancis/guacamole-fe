import { displaySnackMessage } from 'modules/snack';
import * as React from 'react';

// third-party libraries
import Particles from 'react-particles-js';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

// thunk
import { logoutUser } from 'modules/user';

// interfaces
import { HomePageProps, HomePageState } from 'pages/HomePage/interfaces';

// components
import HomeHeader from 'components/HomeAuthHeader';

// styles
import './HomePage.scss';

// helpers
import { authService } from 'utils/auth';

const particlesOptions = {
  particles: {
    number: {
      value: 90,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: '#ffffff',
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 1,
      random: true,
      anim: {
        enable: false,
        speed: 30,
        size_min: 0.1,
        sync: false,
      },
    },
    line_linked: {
      enable: true,
      distance: 200,
      color: '#ffffff',
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 6,
      random: false,
      straight: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    events: {
      onhover: {
        enable: true,
      },
      onclick: {
        enable: true,
      },
      resize: true,
    },
    modes: {
      repulse: {
        distance: 100,
      },
      push: {
        particles_nb: 2,
      },
      remove: {
        particles_nb: 1,
      },
    },
  },
  retina_detect: true,
};

export class HomePage extends React.Component<HomePageProps, HomePageState> {
  private errorMessage;
  state = {
    isLoading: true,
  };

  componentDidMount () {
    const sessionError = localStorage.getItem('sessionError');

    if (sessionError) {
      this.errorMessage = sessionError;
      displaySnackMessage(this.errorMessage);
    }
  }

  componentWillUnmount () {
    localStorage.removeItem('locationReferrer');
  }

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
      <NavLink to={'/dashboard'}>
        <button className="mdc-button mdc-button--raised">
          <span className="mdc-button__label">Go to dashboard</span>
        </button>
      </NavLink>
    </React.Fragment>
  )

  render = () => {
    return (
      <React.Fragment>
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
          <Particles className="particles" params={particlesOptions}/>
          <div className="hero-container">
            <div className="hero-info">
              <h1>You Fly, We Connect</h1>
              <h2>Fly anywhere and share your space.</h2>
              {authService.isAuthenticated() ? this.renderGoToDashboard() : this.renderJoinCommunity()}
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export const mapStateToProps = state => ({
  user: state.user,
});

export const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser()),
});

// export default HomePage;
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
