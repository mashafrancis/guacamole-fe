import * as React from 'react';

// third-party libraries
import { Cell, Grid, Row } from '@material/react-layout-grid';
import { connect } from 'react-redux';

// components
import AuthHeader from '@components/AuthHeader';
import Button from '@components/Button';
import PasswordField from '@components/PasswordField';

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
      password: '',
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
    const { value, name } = event;

    this.setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }

  fieldStateChanged = (field: keyof ResetPasswordPageState) => (state) => {
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
    const { password, token } = this.state;
    const user = { password };

    this.props.resetPassword(user, token);
    this.setState({ isLoading: true });
  }

  renderResetPasswordForm = () => {
    return (
      <React.Fragment>
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
    const { password, isLoading } = this.state;
    const { history } = this.props

    return (
      <div className="register">
      <AuthHeader
        forwardButtonName="Login"
        backwardButtonName="Home"
        forwardAction={() => history.push('/login/email')}
        backwardAction={() => history.push('/')}
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
              name={isLoading ? 'Loading...' : 'Confirm New Password'}
              id="cc-register"
              disabled={!password}
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
