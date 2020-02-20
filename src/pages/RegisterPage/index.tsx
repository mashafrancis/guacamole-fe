import * as React from 'react';

// components
import AuthHeader from '@components/AuthHeader';
import Button from '@components/Button';
import EmailField from '@components/EmailField';
import FormField from '@components/FormField';
import PasswordField from '@components/PasswordField';
// third-party libraries
import { Cell, Grid, Row } from '@material/react-layout-grid';
import MaterialIcon from '@material/react-material-icon';
// thunks
import { registerUser } from '@modules/register';
import { displaySnackMessage } from '@modules/snack';
// third-party libraries
import { connect } from 'react-redux';
// interfaces
import { RegisterPageProps, RegisterPageState } from './interfaces';
// styles
import './RegisterPage.scss';

export class RegisterPage extends React.Component<RegisterPageProps, RegisterPageState> {
  private errorMessage;
  // This method calls the parent element with props parameter.
  constructor(props) {
    super(props);
    this.state = {
      fields: {},
      password: '',
      email: '',
      username: '',
      isLoading: false,
      isValid: true,
      focused: false,
      errors: [],
      value: '',
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
   * @returns {void}
   * @param e
   */
  handleInputChange = (e) => {
    const { value, name } = e;

    this.setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }

  fieldStateChanged = (field: keyof RegisterPageState) => (state) => {
    this.setState({ ...state, [field]: state.errors.length === 0 });
  }

  validateUsername = (value) => {
    const hasSpecialCharacters = (char) => {
      const code = char.charCodeAt(0);
      return !(!(code > 31 && code < 48) && !(code > 57 && code < 65));
    };

    for (const char of value) {
      if (hasSpecialCharacters(char)) { throw new Error('Username should contain only letters and numbers'); }
    }
    if (value.trim().length < 4) { throw new Error('Username cannot be lesser than 4 characters'); }
    if (value.trim().length > 20) { throw new Error('Username cannot be greater than 20 characters'); }
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { username, email, password } = this.state;
    const user = {
      username,
      email,
      password,
    };

    this.setState(prevState => ({ ...prevState, isLoading: true }));

    this.props.registerUser(user)
      .then(() => {
        this.setState({ isLoading: false });
      });
  }

  renderRegisterForm = () => {
    return (
      <React.Fragment>
        <div className="form-cell">
          <FormField
            id="username"
            labelText="Username"
            type="text"
            leadingIcon={<MaterialIcon role="button" icon="alternate_email" initRipple={null}/>}
            aria-describedby="username-helper-text"
            required
            validator={this.validateUsername}
            onStateChanged={(e) => { this.fieldStateChanged('username'); this.handleInputChange(e); }}
          />
        </div>
        <div className="form-cell">
          <EmailField
            id="email"
            label="email"
            placeholder="Enter Email Address"
            onStateChanged={(e) => { this.fieldStateChanged('email'); this.handleInputChange(e); }}
            required
          />
        </div>
        <div className="form-cell">
          <PasswordField
            id="password"
            label="password"
            type="password"
            aria-describedby="password-helper-text"
            onStateChanged={(e) => { this.fieldStateChanged('password'); this.handleInputChange(e); }}
            required
            placeholder="Enter Password"
            thresholdLength={7}
            minStrength={3}
          />
        </div>
      </React.Fragment>
    );
  }

  render() {
    const { isLoading, username, email, password } = this.state;
    const formValidated = username && email && password;

    const { history } = this.props
    return (
      <div className="register">
        <AuthHeader
          forwardButtonName="Login"
          backwardButtonName="Back"
          forwardAction={() => history.push('/login/email')}
          backwardAction={() => history.push('/register')}
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
                disabled={!formValidated}
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
