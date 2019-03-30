import * as React from 'react';

// third-party libraries
import { NavLink } from 'react-router-dom';

// styles
import './HomePage.scss';

class App extends React.Component<{}> {
  render() {
    return (
      <div>
        <header className="carryforme-nav mdc-top-app-bar">
            <div className="mdc-top-app-bar__row">
                <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
                    <NavLink to={'/'} aria-controls="navigation-drawer"
                             className="mdc-toolbar-menu-icon mdc-toolbar__menu-icon material-icons">
                          menu
                    </NavLink>
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
                                          <span className="mdc-tab-indicator__content
                                          mdc-tab-indicator__content--underline"/>
                                      </span>
                                      <span className="mdc-tab__ripple"/>
                                  </a>
                              </div>
                          </div>
                      </div>
                  </section>

                  <section role="toolbar"
                           className="mdc-top-app-bar__section mdc-top-app-bar__section--align-end user-info__content">
                      <div className="nav-actions">
                          <NavLink to={'/register'} className="mdc-tab--active">
                              <button className="mdc-button mdc-ripple-upgraded">
                                  <span className="mdc-button__label">Join us</span>
                              </button>
                          </NavLink>
                          <NavLink to={'/login'}>
                              <button
                                  className="mdc-button big-round-corner-button sign-in
                                  mdc-button--raised mdc-ripple-upgraded">
                                  <span className="mdc-button__label">Sign in</span>
                              </button>
                          </NavLink>
                      </div>
                  </section>
              </div>
          </header>

      <section id="hero">
          <div id="particles-js" className="hero-container">
              <div className="hero-info">
                  <h1>You Fly, We Connect</h1>
                  <h2>Fly anywhere and share your space.</h2>
                <NavLink to={'/register'}>
                  <button className="mdc-button mdc-button--outlined mdc-button--raised">
                    <span className="mdc-button__label">Join a community</span>
                  </button>
                </NavLink>
              </div>
          </div>
      </section>
      </div>
    );
  }
}

export default App;
