import * as React from 'react';
// import './HomePage.scss';

class App extends React.Component<{}> {
  componentDidMount() {
    const script = document.createElement('script');
    script.src = '../src/assets/js/app.js';
    script.async = true;
    document.body.appendChild(script);
  }

  render() {
    return (
        <div>
        <div className="register">
            <header>
                <a href="index.html">
                  <span className="register-toolbar-actions">
                    <button aria-label="Go back to home page"
                            className="mdc-icon-button material-icons">arrow_back</button>
                    <div className="register__logo">
                      <span className="product-logo-text">Home</span>
                    </div>
                  </span>
                </a>

                <div className="mini-account-menu">
                    <div className="mini-account-menu--desktop">
                        <a href="login.html">
                          <span className="register-toolbar-actions">
                            <div className="register__logo">
                              <span className="product-logo-text">Login</span>
                            </div>
                            <button aria-label="Go back to home page"
                                    className="mdc-icon-button material-icons">arrow_forward
                            </button>
                          </span>
                        </a>
                    </div>

                    <div className="mini-account-menu--mobile">
                        <a href="login.html">
                          <span className="register-toolbar-actions">
                            <div className="register__logo">
                              <span className="product-logo-text">Login</span>
                            </div>
                            <button aria-label="Go back to home page"
                                    className="mdc-icon-button material-icons">arrow_forward
                            </button>
                          </span>
                        </a>
                    </div>
                </div>
            </header>
            <div className="mdc-layout-grid">
                <div className="mdc-layout-grid__inner">
                    <div
                        className="mdc-layout-grid__cell grid-start-5 mdc-layout-grid__cell--span-4-desktop-hd
                        mdc-layout-grid__cell--span-6-tablet mdc-layout-grid__cell--span-7-desktop
                        mdc-layout-grid__cell--align-middle">
                        <h1 className="headline-2">Kari4me Test Hosting</h1>
                    </div>
                    <div
                        className="mdc-layout-grid__cell register__section grid-start-5
                        mdc-layout-grid__cell--span-4-tablet mdc-layout-grid__cell--span-4-desktop
                        mdc-layout-grid__cell--align-middle">
                        <div className="form-grid">
                            <div className="form-cell">
                                <div>
                                    <div className="mdc-text-field mdc-text-field--outlined mdc-text-field--fullwidth
                                        mdc-text-field--with-trailing-icon">
                                        <i className="material-icons mdc-text-field__icon">tag_faces</i>
                                        <input id="1" placeholder="" aria-controls="1-helper-text"
                                               aria-describedby="1-helper-text" required={true}
                                               type="text" className="mdc-text-field__input" />
                                        <div className="mdc-notched-outline mdc-notched-outline--upgraded">
                                            <div className="mdc-notched-outline__leading"/>
                                            <div className="mdc-notched-outline__notch"><label
                                                htmlFor="1" className="mdc-floating-label">Username</label></div>
                                            <div className="mdc-notched-outline__trailing"/>
                                        </div>
                                    </div>
                                    <p id="1-helper-text" aria-hidden="true"
                                       className="mdc-text-field-helper-text
                                       mdc-text-field-helper-text--validation-msg">
                                        Username is required</p>
                                </div>
                            </div>
                            <div className="form-cell">
                                <div>
                                    <div className="mdc-text-field mdc-text-field--outlined mdc-text-field--fullwidth
                                        mdc-text-field--with-trailing-icon">
                                        <i className="material-icons mdc-text-field__icon">remove_red_eye</i>
                                        <input id="2" placeholder="" aria-controls="2-helper-text"
                                               aria-describedby="2-helper-text" required={true}
                                               type="password" className="mdc-text-field__input" />
                                        <div className="mdc-notched-outline mdc-notched-outline--upgraded">
                                            <div className="mdc-notched-outline__leading"/>
                                            <div className="mdc-notched-outline__notch"><label
                                                htmlFor="1" className="mdc-floating-label">Password</label></div>
                                            <div className="mdc-notched-outline__trailing"/>
                                        </div>
                                    </div>
                                    <p id="2-helper-text" aria-hidden="true"
                                       className="mdc-text-field-helper-text
                                       mdc-text-field-helper-text--validation-msg">
                                        Password is required</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        className="mdc-layout-grid__cell register__section grid-start-5
                        mdc-layout-grid__cell--span-5-tablet mdc-layout-grid__cell--span-4-desktop
                        mdc-layout-grid__cell--align-middle">
                        <div className="form-grid">
                            <div className="">
                                <button
                                    className="mdc-button big-round-corner-button mdc-button--raised
                                    mdc-ripple-upgraded"
                                    id="cc-register">
                                    <span className="mdc-button__label">Register</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
  }
}

export default App;
