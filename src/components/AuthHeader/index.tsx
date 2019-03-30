import * as React from 'react';

class AuthHeader extends React.Component<{}> {
  render() {
    return (
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
    );
  }
}

export default AuthHeader;
