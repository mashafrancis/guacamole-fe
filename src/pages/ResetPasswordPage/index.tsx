import * as React from 'react';

// third-party libraries
import { Cell, Grid, Row } from '@material/react-layout-grid';
import MaterialIcon from '@material/react-material-icon';
import TextField, { HelperText, Input } from '@material/react-text-field';
import { NavLink } from 'react-router-dom';

// components
import Button from 'components/Button';

// interfaces
import { ResetPasswordPageProps, ResetPasswordPageState } from './interfaces';

// styles
import '@material/react-layout-grid/dist/layout-grid.css';

// helpers
import { validationConfig } from 'utils/helpers/resources';
import { applyValidation } from 'utils/helpers/validationUtils';

export class ResetPasswordPage extends React.Component<ResetPasswordPageProps, ResetPasswordPageState> {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isValid: true,
      focused: false,
      fields: {},
      errors: {},
    };
  }

  forwardArrow = () => {
    return (
      <React.Fragment>
        <NavLink to={'/'}>
          <span className="register-toolbar-actions">
            <div className="register__logo">
              <span className="product-logo-text">Home</span>
            </div>
            <Button
              type="button"
              name="arrow_forward"
              classes="mdc-icon-button material-icons"
              aria_label="Go back to home page"
            />
          </span>
        </NavLink>
      </React.Fragment>
    );
  }

  backArrow = () => {
    return (
      <React.Fragment>
        <NavLink to={'/login'}>
          <span className="register-toolbar-actions">
            <Button
              type="button"
              name="arrow_back"
              classes="mdc-icon-button material-icons"
              aria_label="Go back to login page"
            />
            <div className="register__logo">
              <span className="product-logo-text">Back</span>
            </div>
          </span>
        </NavLink>
      </React.Fragment>
    );
  }

  renderHeader = () => {
    return (
      <React.Fragment>
        <header>
            {this.backArrow()}
            <div className="mini-account-menu">
              <div className="mini-account-menu--desktop">
                {this.forwardArrow()}
              </div>
              <div className="mini-account-menu--mobile">
                {this.forwardArrow()}
              </div>
            </div>
          </header>
      </React.Fragment>
    );
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
   * Computed property for determining if the form can be submitted
   *
   * @returns {Boolean}
   */
  formIsReady = () => {
    const { errors, fields } = this.state;
    const expectedFieldCount = 1;
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
  }

  renderEnterEmailForm = () => {
    const { fields, errors } = this.state;

    return (
      <React.Fragment>
        <div className="form-cell">
          <TextField
            className="mdc-text-field--fullwidth"
            outlined
            label="Enter your email"
            leadingIcon={<MaterialIcon role="button" icon="email" initRipple={null}/>}
            helperText={
              <HelperText
                className="mdc-text-field-helper-text--validation-msg"
                isValidationMessage={true}
                persistent={true}
                validation={true}>
                {'A password reset link will be sent to your email account'}
              </HelperText>}
          >
            <Input
              value={fields.email}
              name="email"
              id="7"
              type="email"
              required={true}
              onBlur={this.validateSingleField}
              onChange={this.handleInputChange}/>
          </TextField>
        </div>
      </React.Fragment>
    );
  }

  render() {
    return (
      <div className="register">
        {this.renderHeader()}
      <Grid>
        <Row>
          <Cell
            className="mdc-layout-grid__cell grid-start-5
                    mdc-layout-grid__cell--align-middle"
            columns={4}
            desktopColumns={4}
            tabletColumns={7}
          >
            <h1 className="headline-2">Reset password</h1>
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
            {this.renderEnterEmailForm()}
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
              name="Reset Password"
              id="cc-register"
              disabled={!this.formIsReady() || this.state.isLoading}
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

export default ResetPasswordPage;
