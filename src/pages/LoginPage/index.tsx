import * as React from 'react';

// third-party libraries
import { Cell, Grid, Row } from '@material/react-layout-grid';
import MaterialIcon from '@material/react-material-icon';
import TextField, { HelperText, Input } from '@material/react-text-field';
import { connect } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';

// components
import Button from 'components/Button';

// thunks
import { loginUser } from 'modules/authentication';
import { displaySnackMessage } from 'modules/snack';

// interfaces
import { LoginPageProps, LoginPageState } from './interfaces';

// helpers
import { authService } from 'utils/auth';
import { applyValidation } from 'utils/helpers/validationUtils';

// resources
import { validationConfig } from 'utils/helpers/resources';

// styles
import './LoginPage.scss';
// import '@material/react-layout-grid/dist/layout-grid.css';

export class LoginPage extends React.Component<LoginPageProps, LoginPageState> {
  private errorMessage;
  // This method calls the parent element with props parameter.
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isValid: true,
      focused: false,
      fields: {},
      errors: {},
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount () {
    const sessionError = localStorage.getItem('sessionError');

    if (sessionError) {
      this.errorMessage = sessionError;
      displaySnackMessage(this.errorMessage);
    }
  }

  componentWillUnmount() {
    localStorage.removeItem('locationReferrer');
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
    const { fields } = this.state;
    const user = {
      email: fields.email as string,
      password: fields.password as string,
    };

    this.setState({ isLoading: true });

    this.props.loginUser(user)
      .then(() => {
        this.setState({ isLoading: false });
      });
  }

  forwardArrow = () => {
    return (
      <React.Fragment>
        <NavLink to={'/register'}>
          <span className="register-toolbar-actions">
            <div className="register__logo">
              <span className="product-logo-text">Register</span>
            </div>
            <Button
              type="button"
              name="arrow_forward"
              classes="mdc-icon-button material-icons"
              aria_label="Go back to login page"
            />
          </span>
        </NavLink>
      </React.Fragment>
    );
  }

  backArrow = () => {
    return (
      <React.Fragment>
        <NavLink to={'/'}>
          <span className="register-toolbar-actions">
            <Button
              type="button"
              name="arrow_back"
              classes="mdc-icon-button material-icons"
              aria_label="Go back to home page"
            />
            <div className="register__logo">
              <span className="product-logo-text">Home</span>
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
   * Validates user login and triggers an error toast if login is unsuccessful
   *
   * @param {string} triedToAuthenticate
   * @param {Boolean} isAuthenticated
   *
   * @returns {void}
   */
  validateLogin = (triedToAuthenticate, isAuthenticated) => {
    const hasErrorQuery = this.props.location.search === '?error=failed+to+create+user+token';

    if ((triedToAuthenticate && !isAuthenticated) || hasErrorQuery) {
      this.errorMessage = 'Login unsuccessful. Please login with a valid email account';
      displaySnackMessage(this.errorMessage);
      localStorage.removeItem('triedToAuthenticate');
    }

    if (triedToAuthenticate && isAuthenticated) {
      localStorage.removeItem('triedToAuthenticate');
    }
  }

  renderLoginForm = () => {
    const { fields, errors } = this.state;

    return (
      <React.Fragment>
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
              id="5"
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
            leadingIcon={<MaterialIcon role="button" icon="remove_red_eye" initRipple={null}/>}
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
              id="6"
              type="password"
              required={true}
              onBlur={this.validatePasswordField}
              onChange={this.handleInputChange}/>
          </TextField>
        </div>
      </React.Fragment>
    );
  }

  render() {
    const isAuthenticated = authService.isAuthenticated();
    const triedToAuthenticate = localStorage.getItem('triedToAuthenticate');

    this.validateLogin(triedToAuthenticate, isAuthenticated);

    return (
      authService.isAuthenticated()
      ? this.renderDefaultPage()
      : (
        <div className="register">
        {this.renderHeader()}
        <Grid>
          <Row>
            <Cell
              className="mdc-layout-grid__cell grid-start-5
                      mdc-layout-grid__cell--align-middle"
              desktopColumns={4}
              tabletColumns={7}
              phoneColumns={4}
            >
              <h1 className="headline-2">Login into account</h1>
            </Cell>
          </Row>
          <Row>
            <Cell
              className="mdc-layout-grid__cell grid-start-5 register__section mdc-layout-grid__cell--align-middle"
              align="middle"
              order={5}
              desktopColumns={4}
              tabletColumns={4}
              phoneColumns={4}
            >
              {this.renderLoginForm()}
            </Cell>
          </Row>
          <Row>
            <Cell
              className="mdc-layout-grid__cell grid-start-5 mdc-layout-grid__cell--span-2-desktop-hd"
              desktopColumns={2}
              order={1}
              phoneColumns={2}
              tabletColumns={2}
              align="middle"
            >
              <Button
                type="button"
                name="Login"
                id="cc-register"
                disabled={!this.formIsReady() || this.state.isLoading}
                onClick={this.onSubmit}
                classes="mdc-button big-round-corner-button mdc-button--raised"
              />
            </Cell>
            <Cell
              className=""
              desktopColumns={2}
              order={2}
              phoneColumns={2}
              tabletColumns={2}
              align="middle"
            >
              <NavLink to={'/reset-password'}>
                <span>Reset Password</span>
              </NavLink>
            </Cell>
          </Row>
        </Grid>
      </div>
    ));
  }
}

export const mapStateToProps = state => ({
  user: state.user,
  error: state.error,
});

export const mapDispatchToProps = dispatch => ({
  loginUser: user => dispatch(loginUser(user)),
  displaySnackMessage: message => dispatch(displaySnackMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
