import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { authService } from 'utils/auth';

// components
import Button from 'components/Button';

// interfaces
import { HomeAuthHeaderProps } from './interfaces';

export class HomeHeader extends React.Component<HomeAuthHeaderProps> {
  logoutUser = () => {
    this.props.logoutUser();
    location.reload();
  }

  renderHomeNavUnauth = () => (
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
  )

  renderHomeNavAuth = () => (
    <React.Fragment>
      <div className="mini-account-menu--desktop">
        <div className="mini-account-menu__content">
          <Button
            classes="mdc-button"
            type="button"
            name="Sign Out"
            onClick={this.logoutUser}
          />
        </div>
      </div>
      <div className="mini-account-menu--mobile">
        <div className="mini-account-menu__content">
          <Button
            classes="mdc-button"
            type="button"
            name="Sign Out"
            onClick={this.logoutUser}
          />
        </div>
      </div>
    </React.Fragment>
  )

  render = () => {
    return (
      <React.Fragment>
        { authService.isAuthenticated() ? this.renderHomeNavAuth() : this.renderHomeNavUnauth() }
      </React.Fragment>
    );
  }
}

export default HomeHeader;
