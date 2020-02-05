import * as React from 'react';

// components
import Button from '@components/Button';
import { NavLink } from 'react-router-dom';

// interfaces
import { AuthHeaderProps } from './interfaces';

const forwardArrow = (action, name) => (
  <React.Fragment>
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
  </React.Fragment>
);

const backArrow = (action, name) => (
  <React.Fragment>
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
  </React.Fragment>
);

const AuthHeader: React.SFC<AuthHeaderProps> = props => (
  <React.Fragment>
    <header>
        {props.backwardButtonName ? backArrow(props.backwardAction, props.backwardButtonName) : ''}
        <div className="mini-account-menu">
          <div className="mini-account-menu--desktop">
            {props.forwardButtonName ? forwardArrow(props.forwardAction, props.forwardButtonName) : ''}
          </div>
          <div className="mini-account-menu--mobile">
            {props.forwardButtonName ?  forwardArrow(props.forwardAction, props.forwardButtonName) : ''}
          </div>
        </div>
      </header>
  </React.Fragment>
);

export default AuthHeader;
