import * as React from 'react';

// third-party libraries
import { Cell, Grid, Row } from '@material/react-layout-grid';
import MaterialIcon from '@material/react-material-icon';
import TextField, { HelperText, Input } from '@material/react-text-field';
import { connect } from 'react-redux';

// components
import AuthHeader from '@components/AuthHeader';
import Button from '@components/Button';
import { validationConfig } from '@utils/helpers/resources';
import { applyValidation } from '@utils/helpers/validationUtils';

// thunks
import { resetPassword } from '@modules/passwordReset';
import { displaySnackMessage } from '@modules/snack';

// interfaces
import { ResetPasswordPageProps, ResetPasswordPageState } from './interfaces';

// styles
import '@material/react-layout-grid/dist/layout-grid.css';

export class ResetPasswordPage extends React.Component<ResetPasswordPageProps, ResetPasswordPageState> {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isValid: true,
      focused: false,
      fields: {},
      errors: {},
      isPasswordHidden: true,
      isConfirmPasswordHidden: true,
      token: window.location.search && new URLSearchParams(window.location.search).getAll('token')[0],
    };
  }

  /**
   * Handles text field input change
   *
   * @param {event} event input change event
   *
   * @returns {void}
   */
  handleInputChange = (event) => {
    const { name: field, value } = event.target;

    this.setState(prevState => ({
      fields: {
        ...prevState.fields,
        [field]: value,
      },
    }));
  }

  toggleHidePassword = () => {
    this.setState(prevState => ({
      isPasswordHidden: !prevState.isPasswordHidden,
    }));
  }

  toggleHideConfirmPassword = () => {
    this.setState(prevState => ({
      isConfirmPasswordHidden: !prevState.isConfirmPasswordHidden,
    }));
  }

  /**
   * Sets the field error string
   *
   * @param {String} field The name of the error field
   * @param {String} error The error message
   *
   * @returns {void}
   */
  setFieldError = (field: string, error: string) => {
    this.setState(prevState => ({
      errors: {
        ...prevState.errors,
        [field]: error,
      },
    }));
  }

  /**
   * Validates a single field of a form
   * Triggered by a form input event
   *
   * @param {event} event DOM event
   * @param {object} config
   *
   * @returns {void}
   */
  validateSingleField = (event, config = validationConfig) => {
    const field = event.target.name;
    const value = this.state.fields[field];
    const error = applyValidation(value, config[field]);

    this.setFieldError(field, error);
  }

  /**
   * Validates the password field
   *
   * @param {event} event DOM event
   *
   * @returns {void}
   */
  validatePasswordField = (event) => {
    const field = event.target.name;
    const value = this.state.fields[field];
    (!value)
      ? this.setFieldError(field, 'Kindly provide your password')
      : this.setFieldError(field, '');
  }

  /**
   * Validates the confirmation password
   *
   * @param {event} event DOM event
   *
   * @returns {void}
   */
  validateConfirmationPassword = (event) => {
    const field = event.target.name;
    const value = this.state.fields[field];
    (this.state.fields.password !== value)
      ? this.setFieldError(field, 'Password mismatch')
      : this.setFieldError(field, '');
  }

  /**
   * Computed property for determining if the form can be submitted
   *
   * @returns {Boolean}
   */
  formIsReady = () => {
    const { errors, fields } = this.state;
    const expectedFieldCount = 2;
    const formHasMissingFields = Object.keys(fields).length < expectedFieldCount;
    const formHasError = Object.values(errors).some(error => Boolean(error));

    return !formHasMissingFields && !formHasError;
  }

  /**
   * Handles the submission on successful validation
   *
   * @param {event} event DOM event
   *
   * @returns {void}
   */
  onSubmit = (event) => {
    event.preventDefault();
    const { fields, token } = this.state;
    const user = {
      password: fields.password as string,
    };

    this.props.resetPassword(user, token);
    this.setState({ isLoading: true });
  }

  renderResetPasswordForm = () => {
    const { fields, errors, isPasswordHidden, isConfirmPasswordHidden } = this.state;

    return (
      <React.Fragment>
        <div className="form-cell">
          <TextField
            className="mdc-text-field--fullwidth"
            outlined
            label="Enter New Password"
            onLeadingIconSelect={this.toggleHidePassword}
            leadingIcon={
              <MaterialIcon
                role="button"
                icon={isPasswordHidden ? 'visibility' : 'visibility_off'}
                hasRipple={true}
                initRipple={null}/>}
            helperText={
              <HelperText
                className="mdc-text-field-invalid-helper"
                isValidationMessage={true}
                persistent={true}
                validation={true}>
                {errors.password}
              </HelperText>}
          >
            <Input
              value={fields.password}
              name="password"
              id="7"
              type={isPasswordHidden ? 'password' : 'text'}
              required={true}
              onBlur={this.validateSingleField}
              onChange={this.handleInputChange}/>
          </TextField>
        </div>
        <div className="form-cell">
          <TextField
            className="mdc-text-field--fullwidth"
            outlined
            label="Confirm New Password"
            onLeadingIconSelect={this.toggleHideConfirmPassword}
            leadingIcon={
              <MaterialIcon
                role="button"
                icon={isConfirmPasswordHidden ? 'visibility' : 'visibility_off'}
                hasRipple={true}
                initRipple={null}/>}
            helperText={
              <HelperText
                className="mdc-text-field-invalid-helper"
                isValidationMessage={true}
                persistent={true}
                validation={true}>
                {errors.confirmPassword}
              </HelperText>}
          >
            <Input
              value={fields.confirmPassword}
              name="confirmPassword"
              id="8"
              type={isConfirmPasswordHidden ? 'password' : 'text'}
              required={true}
              onBlur={this.validateConfirmationPassword}
              onChange={this.handleInputChange}/>
          </TextField>
        </div>
      </React.Fragment>
    );
  }

  render() {
    return (
      <div className="register">
      <AuthHeader
        forwardButtonName="Login"
        backwardButtonName="Home"
        forwardLink={'/login/email'}
        backwardLink={'/'}
      />
      <Grid>
        <Row>
          <Cell
            className="mdc-layout-grid__cell grid-start-5
                    mdc-layout-grid__cell--align-middle"
            columns={4}
            desktopColumns={4}
            tabletColumns={7}
          >
            <h1 className="headline-2">Enter New Password</h1>
          </Cell>
        </Row>
        <Row>
          <Cell
            className="mdc-layout-grid__cell grid-start-5 register__section
                    mdc-layout-grid__cell--align-middle"
            align="middle"
            order={5}
            columns={4}
            desktopColumns={4}
            tabletColumns={4}
          >
            {this.renderResetPasswordForm()}
          </Cell>
        </Row>
        <Row>
          <Cell
            className="mdc-layout-grid__cell grid-start-5
                    mdc-layout-grid__cell--align-middle"
            align="middle"
          >
            <Button
              type="button"
              name={this.state.isLoading ? 'Loading...' : 'Confirm New Password'}
              id="cc-register"
              disabled={!this.formIsReady()}
              onClick={this.onSubmit}
              classes="mdc-button big-round-corner-button mdc-button--raised"
            />
          </Cell>
        </Row>
      </Grid>
    </div>
    );
  }
}

export const mapStateToProps = state => ({
  user: state.register.user,
  error: state.error,
});

export const mapDispatchToProps = dispatch => ({
  resetPassword: (user, token) => dispatch(resetPassword(user, token)),
  displaySnackMessage: message => dispatch(displaySnackMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordPage);
