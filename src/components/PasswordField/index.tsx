import * as React from 'react';

// third party apps
import FormField from '@components/FormField';
import MaterialIcon from '@material/react-material-icon';
import * as zxcvbn from 'zxcvbn';

// interfaces
import { PasswordFieldProps, PasswordFieldState } from '@components/PasswordField/interfaces';

// styles
import '@components/PasswordField/PasswordField.scss';

class PasswordField extends React.Component<PasswordFieldProps, PasswordFieldState> {
  private readonly minStrength: number;
  private readonly thresholdLength: number;

  constructor(props) {
    super(props);
    this.state = {
      password: '',
      strength: 0,
      isPasswordHidden: true,
    };
    const {
      minStrength = 3,
      thresholdLength = 7,
    } = props;
    this.minStrength = typeof minStrength === 'number' ? Math.max(Math.min(minStrength, 4), 0) : 3;
    this.thresholdLength = typeof thresholdLength === 'number' ? Math.max(thresholdLength, 7) : 7;
  }

  validatePasswordStrong = (value) => {
    if (value.length <= this.thresholdLength) { throw new Error('Password is short'); }
    if (zxcvbn(value).score < this.minStrength) { throw new Error('Password is weak'); }
  }

  stateChanged = (state) => {
    this.setState({
      password: state.value,
      strength: zxcvbn(state.value).score,
    },            () => this.props.onStateChanged(state));
  }

  toggleHidePassword = () => this.setState(prevState => ({
    ...prevState,
    isPasswordHidden: !prevState.isPasswordHidden,
  }))

  render() {
    const { password, isPasswordHidden, strength } = this.state;
    const passwordLength = password.length;
    const passwordStrong = strength >= this.minStrength;
    const passwordLong = passwordLength > this.thresholdLength;
    const counterClass =
      ['badge', passwordLong ? passwordStrong ? 'badge-success' : 'badge-warning' : 'badge-error'].join(' ').trim();

    const strengthClass = ['strength-meter mt-2', passwordLength > 0 ? 'visible' : 'invisible'].join(' ').trim();

    return (
      <React.Fragment>
        <div className={strengthClass}>
          <div className="strength-meter-fill" data-strength={strength}/>
        </div>
        <FormField
          id="password"
          labelText="Password"
          type={isPasswordHidden ? 'password' : 'text'}
          onLeadingIconSelect={this.toggleHidePassword}
          onStateChanged={this.stateChanged}
          leadingIcon={
            <MaterialIcon
              role="button"
              icon={isPasswordHidden ? 'visibility' : 'visibility_off'}
              hasRipple={true}
              initRipple={null}/>}
          aria-describedby="password-helper-text"
          required
          validator={this.validatePasswordStrong}
          trailingIcon={
            <div className="position-absolute password-count mx-3">
          <span className={counterClass}>
            {passwordLength ? passwordLong ? `${this.thresholdLength}+` : passwordLength : ''}
          </span>
            </div>
          }
        />
      </React.Fragment>
    );
  }
}

export default PasswordField;
