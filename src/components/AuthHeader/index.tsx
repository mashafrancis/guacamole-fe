import * as React from 'react';

// components
import Button from '@components/Button';
import { NavLink } from 'react-router-dom';

// interfaces
import { AuthHeaderProps } from './interfaces';

const forwardArrow = (action, name) => (
  <React.Fragment>
    {/* <NavLink to={link}> */}
      <span className="register-toolbar-actions">
        <div className="register__logo">
          <span className="product-logo-text">{name}</span>
        </div>
          <Button
            type="button"
            name="arrow_forward"
            onClick={action}
            classes="mdc-icon-button material-icons"
            aria_label="Go forward"
          />
      </span>
    {/* </NavLink> */}
  </React.Fragment>
);

const backArrow = (action, name) => (
  <React.Fragment>
    {/* <NavLink to={link}> */}
      <span className="register-toolbar-actions">
        <Button
          type="button"
          name="arrow_back"
          onClick={action}
          classes="mdc-icon-button material-icons"
          aria_label="Go back"
        />
        <div className="register__logo">
          <span className="product-logo-text">{name}</span>
        </div>
      </span>
    {/* </NavLink> */}
  </React.Fragment>
);

const AuthHeader: React.SFC<AuthHeaderProps> = props => (
  <React.Fragment>
    <header>
        {backArrow(props.backwardAction, props.backwardButtonName)}
        <div className="mini-account-menu">
          <div className="mini-account-menu--desktop">
            {forwardArrow(props.forwardAction, props.forwardButtonName)}
          </div>
          <div className="mini-account-menu--mobile">
            {forwardArrow(props.forwardAction, props.forwardButtonName)}
          </div>
        </div>
      </header>
  </React.Fragment>
);

export default AuthHeader;
