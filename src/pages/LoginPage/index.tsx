import * as React from 'react';

// third-party libraries
import EmailField from '@components/EmailField';
import FormField from '@components/FormField';
import { Cell, Grid, Row } from '@material/react-layout-grid';
import MaterialIcon from '@material/react-material-icon';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

// components
import AuthHeader from '@components/AuthHeader';
import Button from '@components/Button';

// thunks
import { loginUser } from '@modules/login';
import { displaySnackMessage } from '@modules/snack';

// interfaces
import { LoginPageProps, LoginPageState } from './interfaces';

// helpers
import { authService } from '@utils/auth';

// styles
import './LoginPage.scss';

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
      isPasswordHidden: true,
      password: '',
      email: '',
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
    const { value, name } = event;

    this.setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }

  fieldStateChanged = (field: keyof LoginPageState) => (state) => {
    this.setState({ ...state, [field]: state.errors.length === 0 });
  }

  toggleHidePassword = () => {
    this.setState(prevState => ({ isPasswordHidden: !prevState.isPasswordHidden }));
  }

  /**
   * Validates the password field
   *
   * @returns {void}
   * @param value
   */
  validatePasswordField = (value) => {
    if (!value) { throw new Error('Kindly provide your password'); }
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
    const { email, password } = this.state;
    const user = {
      email,
      password,
    };

    this.setState({ isLoading: true });

    this.props.loginUser(user)
      .then(() => {
        this.setState({ isLoading: false });
      });
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
    const { isPasswordHidden } = this.state;

    return (
      <React.Fragment>
        <div className="form-cell">
          <EmailField
            id="email"
            label="Email"
            placeholder="Enter Email Address"
            onStateChanged={(e) => { this.fieldStateChanged('email'); this.handleInputChange(e); }}
            required
          />
        </div>
        <div className="form-cell">
          <FormField
            id="password"
            labelText="Password"
            type={isPasswordHidden ? 'password' : 'text'}
            onLeadingIconSelect={this.toggleHidePassword}
            leadingIcon={
              <MaterialIcon
                role="button"
                icon={isPasswordHidden ? 'visibility' : 'visibility_off'}
                hasRipple={true}
                initRipple={null}/>}
            aria-describedby="username-helper-text"
            required
            validator={this.validatePasswordField}
            onStateChanged={(e) => { this.fieldStateChanged('password'); this.handleInputChange(e); }}
          />
        </div>
      </React.Fragment>
    );
  }

  render() {
    const { isLoading, email, password } = this.state;
    const formValidated = email && password;
    const isAuthenticated = authService.isAuthenticated();
    const triedToAuthenticate = localStorage.getItem('triedToAuthenticate');
    const { history } = this.props
    this.validateLogin(triedToAuthenticate, isAuthenticated);

    return (
      <div className="register">
      <AuthHeader
        forwardButtonName="Register"
        backwardButtonName="Back"
        forwardAction={() => history.push('/register/email')}
        backwardAction={() => history.push('/login')}
      />
      <Grid>
        <Row>
          <Cell
            className="mdc-layout-grid__cell grid-start-5
                    mdc-layout-grid__cell--align-middle"
            columns={4}
            desktopColumns={4}
            tabletColumns={8}
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
            columns={4}
            desktopColumns={4}
            tabletColumns={8}
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
              name={isLoading ? 'Please wait...' : 'Login'}
              id="cc-register"
              disabled={!formValidated}
              onClick={this.onSubmit}
              classes="mdc-button big-round-corner-button mdc-button--raised"
            />
          </Cell>
          <Cell
            className=""
            desktopColumns={2}
            order={2}
            phoneColumns={2}
            tabletColumns={3}
            align="middle"
          >
            <NavLink to={'/forgot-password'}><h4 className="headline-5">Forgot your password?</h4></NavLink>
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
  loginUser: user => dispatch(loginUser(user)),
  displaySnackMessage: message => dispatch(displaySnackMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
