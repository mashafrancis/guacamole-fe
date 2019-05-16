import * as React from 'react';

// interfaces
import { AuthHeaderProps, AuthHeaderState } from 'components/AuthHeader/interfaces';

class AuthHeader extends React.Component<AuthHeaderProps, AuthHeaderState> {
  state = {
    isUserExisting: false,
    dropDownHidden: true,
  };

  componentDidMount() {
    const { user } = this.props;

    if (user.tokenId) {
      this.setState({
        isUserExisting: true,
      });
    }
  }

  /**
   * Returns the first or second URI section of the current active route
   *
   * @returns {string} uriPath
   */
  currentPath = () => {
    let uriPath = this.props.location.pathname.split('/')[1];
    const paths = ['register', 'login', 'logout'];

    if (!paths.includes(uriPath)) {
      uriPath = this.props.location.pathname.split('/')[2];
    }

    return uriPath;
  }

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
