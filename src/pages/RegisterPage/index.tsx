import * as React from 'react';

// third-party libraries
import { Cell, Grid, Row } from '@material/react-layout-grid';
import MaterialIcon from '@material/react-material-icon';
import TextField, { HelperText, Input } from '@material/react-text-field';
import { connect } from 'react-redux';

// components
import AuthHeader from 'components/AuthHeader';
import Button from 'components/Button';

// thunks
import { registerUser } from 'modules/register';
import { displaySnackMessage } from 'modules/snack';

// interfaces
import { RegisterPageProps, RegisterPageState } from './interfaces';

// helpers
import { applyValidation } from 'utils/helpers/validationUtils';

// resources
import { validationConfig } from 'utils/helpers/resources';

// styles
// import '@material/react-layout-grid/dist/layout-grid.css';
import './RegisterPage.scss';

export class RegisterPage extends React.Component<RegisterPageProps, RegisterPageState> {
  // This method calls the parent element with props parameter.
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
    };
    this.onSubmit = this.onSubmit.bind(this);
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
    const expectedFieldCount = 4;
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
    const { fields } = this.state;
    const user = {
      username: fields.username as string,
      email: fields.email as string,
      password: fields.password as string,
    };

    this.setState({ isLoading: true });

    this.props.registerUser(user)
      .then(() => {
        this.setState({ isLoading: false });
      });
  }

  renderRegisterForm = () => {
    const { fields, errors, isPasswordHidden, isConfirmPasswordHidden } = this.state;

    return (
      <React.Fragment>
        <div className="form-cell">
          <TextField
            className="mdc-text-field--fullwidth"
            outlined
            label="Username"
            leadingIcon={<MaterialIcon role="button" icon="alternate_email" initRipple={null}/>}
            helperText={
              <HelperText
                className="mdc-text-field-invalid-helper"
                isValidationMessage={true}
                persistent={true}
                validation={true}>
                {errors.username}
              </HelperText>}
          >
            <Input
              value={fields.username}
              name="username"
              id="1"
              type="text"
              required={true}
              onBlur={this.validateSingleField}
              onChange={this.handleInputChange}/>
          </TextField>
        </div>
        <div className="form-cell">
          <TextField
            className="mdc-text-field--fullwidth"
            outlined
            label="Email"
            leadingIcon={<MaterialIcon role="button" icon="email" initRipple={null}/>}
            helperText={
              <HelperText
                className="mdc-text-field-invalid-helper"
                isValidationMessage={true}
                persistent={true}
                validation={true}>
                {errors.email}
              </HelperText>}
          >
            <Input
              value={fields.email}
              name="email"
              id="2"
              type="text"
              required={true}
              onBlur={this.validateSingleField}
              onChange={this.handleInputChange}/>
          </TextField>
        </div>
        <div className="form-cell">
          <TextField
            className="mdc-text-field--fullwidth"
            outlined
            label="Password"
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
              id="3"
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
            label="Confirm Password"
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
              id="4"
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
    const { isLoading } = this.state;
    return (
      <div className="register">
        <AuthHeader
          forwardButtonName="Login"
          backwardButtonName="Back"
          forwardLink={'/login/email'}
          backwardLink={'/register'}
        />
        <Grid>
          <Row>
            <Cell
              className="mdc-layout-grid__cell grid-start-5 mdc-layout-grid__cell--align-middle"
              columns={4}
              desktopColumns={4}
              tabletColumns={8}
            >
              <h1 className="headline-2">Create a new account</h1>
            </Cell>
          </Row>
          <Row>
            <Cell
              className="mdc-layout-grid__cell grid-start-5 register__section mdc-layout-grid__cell--align-middle"
              align="middle"
              order={5}
              columns={4}
              desktopColumns={4}
              tabletColumns={8}
            >
              {this.renderRegisterForm()}
            </Cell>
          </Row>
          <Row>
            <Cell
              className="mdc-layout-grid__cell grid-start-5 mdc-layout-grid__cell--align-middle"
              align="middle"
            >
              <Button
                type="button"
                name={isLoading ? 'Registering...' : 'Register'}
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
  user: state.user,
  error: state.error,
});

export const mapDispatchToProps = dispatch => ({
  registerUser: user => dispatch(registerUser(user)),
  displaySnackMessage: message => dispatch(displaySnackMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
