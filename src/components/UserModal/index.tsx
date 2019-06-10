// react libraries
import * as React from 'react';

// components
import Button from 'components/Button';

// interfaces
import { UserModalProps } from './interfaces';

const UserModal: React.SFC<UserModalProps> = (props) => {
  return (
    <div className="account-menu">
    <p className="overline">Signed in as:</p>
    <p className="body-1">{props.user.email}</p>
    <div className="account-menu__actions">
      <Button
        classes="mdc-button mdc-button--raised mdc-ripple-upgraded"
        type="button"
        name="Sign Out"
        onClick={props.logoutUser}
      />
      <button className="mdc-button">
        <span className="mdc-button__label">View Profile</span>
      </button>
    </div>
  </div>
  );
}

export default UserModal;
