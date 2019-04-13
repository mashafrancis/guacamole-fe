import * as React from 'react';
import { connect } from 'react-redux';

// third-party libraries
import { NavLink } from 'react-router-dom';

// interfaces
import { HomePageProps, HomePageState } from 'pages/HomePage/interfaces';

// components
import Spinner from '../../components/Spinner';

// styles
import './HomePage.scss';

export class HomePage extends React.Component<HomePageProps, HomePageState> {
  state = {
    isLoading: true,
  };

  componentDidMount() {
    setTimeout(() => this.setState({ isLoading: false }), 3000);
  }

  renderHomeNavUnauth = () => {
    return (
      <div className="nav-actions">
        <NavLink to={'/register'} className="mdc-tab--active">
          <button className="mdc-button">
            <span className="mdc-button__label">Join us</span>
          </button>
        </NavLink>
        <NavLink to={'/login'}>
          <button className="mdc-button big-round-corner-button sign-in mdc-button--raised mdc-ripple-upgraded">
            <span className="mdc-button__label">Sign in</span>
          </button>
        </NavLink>
      </div>
    );
  }

  renderHomeNavAuth = () => {
    return (
      <React.Fragment>
      <div className="mini-account-menu--desktop">
        <span>
          <img className="mini-account-menu__image"
               src="https://res.cloudinary.com/mashafrancis/image/upload/v1552641620/kari4me/nan.jpg"/>
        </span>
        <div className="mini-account-menu__content">
          <p className="body-2 mini-account-menu__email">{this.props.user.email}</p>
          <a>Sign out</a>
        </div>
      </div>
        <div className="mini-account-menu--mobile">
          <span className="mini-account-menu__image">
            <img className="mini-account-menu__image"
                 src="https://res.cloudinary.com/mashafrancis/image/upload/v1552641620/kari4me/nan.jpg"/>
          </span>
        </div>
        <div className="account-menu">
          <p className="overline">Signed in as:</p>
          <p className="body-1">{this.props.user.email}</p>
          <div className="account-menu__actions">
            <button className="mdc-button mdc-button--raised mdc-ripple-upgraded">
              <span className="mdc-button__label">Sign out</span>
            </button>
            <button className="mdc-button router-link-exact-active mdc-tab--active">
              <span className="mdc-button__label">View Profile</span>
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }

  renderDrawerModal = () => {
    return (
      <React.Fragment>
        <div>
          <aside aria-expanded="false" aria-hidden="true" dir="ltr"
                 className="mdc-drawer mdc-drawer--modal mdc-drawer--modal" slot="drawer"
                 id="navigation-drawer">
            <div className="mdc-drawer__content">
              <nav role="menubar" className="mdc-list">
                <NavLink to={'/about'} className="mdc-list-item" role="menuitem">
                  <span className="mdc-list-item__text">How it works</span>
                </NavLink>
                <NavLink to={'/register'} className="mdc-list-item" role="menuitem">
                  <span className="mdc-list-item__text">Register</span>
                </NavLink>
              </nav>
              <footer className="nav-drawer-footer">
                <NavLink to={'/register'} className="mdc-tab--active">
                  <p className="anchor-label font-weight__500">Join us</p>
                </NavLink>
              </footer>
            </div>
          </aside>
          <div className="mdc-drawer-scrim" />
        </div>
      </React.Fragment>
    );
  }

  render = () => {
    const { isLoading } = this.state;

    return (
      isLoading
      ? <Spinner/>
      : (
        <div>
          <header className="carryforme-nav mdc-top-app-bar">
            <div className="mdc-top-app-bar__row">
              <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
                {/*<a aria-controls="navigation-drawer"*/}
                   {/*className="mdc-toolbar-menu-icon mdc-toolbar__menu-icon material-icons">*/}
                  {/*menu*/}
                {/*</a>*/}
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
                    {this.renderHomeNavUnauth()}
                  </section>
              </div>
            </header>
          {this.renderDrawerModal()}
        <section id="hero">
          <div id="particles-js" className="hero-container">
            <div className="hero-info">
                <h1>You Fly, We Connect</h1>
                <h2>Fly anywhere and share your space.</h2>
              <NavLink to={'/register'}>
                <button className="mdc-button mdc-button--raised">
                  <span className="mdc-button__label">Join a community</span>
                </button>
              </NavLink>
            </div>
          </div>
        </section>
        </div>
      ));
  }
}

export const mapStateToProps = state => ({
  user: state.authentication.user,
});

// export default HomePage;
export default connect(mapStateToProps)(HomePage);
