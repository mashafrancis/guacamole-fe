import * as React from 'react';

// third-party libraries
import { Cell, Grid, Row } from '@material/react-layout-grid';
import MaterialIcon from '@material/react-material-icon';
import TextField, { HelperText, Input } from '@material/react-text-field';
import { connect } from 'react-redux';

// components
import AuthHeader from '@components/AuthHeader';
import Button from '@components/Button';
import EmailField from '@components/EmailField';

// thunks
import { forgotPassword } from '@modules/passwordReset';
import { displaySnackMessage } from '@modules/snack';

// interfaces
import { ForgotPasswordPageProps, ForgotPasswordPageState } from './interfaces';

// styles
import '@material/react-layout-grid/dist/layout-grid.css';

// helpers
import { validationConfig } from '@utils/helpers/resources';
import { applyValidation } from '@utils/helpers/validationUtils';

export class ForgotPasswordPage extends React.Component<ForgotPasswordPageProps, ForgotPasswordPageState> {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      email: '',
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
    const { value, name } = event;

    this.setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }

  fieldStateChanged = (field: keyof ForgotPasswordPageState) => (state) => {
    this.setState({ ...state, [field]: state.errors.length === 0 });
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
    const { email } = this.state;
    const user = { email };
    this.props.forgotPassword(user);
    this.setState({ isLoading: true });
  }

  render() {
    const { history } = this.props
    return (
      <div className="register">
      <AuthHeader
        forwardButtonName="Home"
        backwardButtonName="Back"
        forwardAction={() => history.push('/')}
        backwardAction={ () => history.push('/login/email')}
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
            <h1 className="headline-2">Reset password</h1>
            <h5>A password reset link will be sent to your email account</h5>
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
            <div className="form-cell">
              <EmailField
                id="email"
                label="Enter your email"
                placeholder="Enter Email Address"
                onStateChanged={(e) => { this.fieldStateChanged('email'); this.handleInputChange(e); }}
                required
              />
            </div>
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
              disabled={!this.state.email}
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
  forgotPassword: user => dispatch(forgotPassword(user)),
  displaySnackMessage: message => dispatch(displaySnackMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordPage);
