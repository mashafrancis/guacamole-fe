import * as React from 'react';

// third party apps
import MaterialIcon from '@material/react-material-icon';

// interfaces
import { AuthButtonProps } from './interfaces';

// styles
import './AuthButton.scss';

const AuthButton: React.SFC<AuthButtonProps> = props => (
  <button
    type="button"
    className="kirk-itemChoice mb-l"
    role="option"
    aria-selected="false"
    onClick={props.handleClick}
  >
    <div className="kirk-itemChoice-label">{props.name}</div>
    <div className="kirk-itemChoice-right">
      <div className="kirk-itemChoice-rightAddon">
        <img height="24" width="24" alt="facebook"
             src={props.image}/>
      </div>
      <div className="kirk-itemChoice-chevron">
        <MaterialIcon icon="keyboard_arrow_right" initRipple={null}/>
      </div>
    </div>
  </button>
);

export default AuthButton;
