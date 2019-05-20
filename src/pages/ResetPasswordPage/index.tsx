import * as React from 'react';

// third-party libraries
import { Cell, Grid, Row } from '@material/react-layout-grid';
import MaterialIcon from '@material/react-material-icon';
import TextField, { HelperText, Input } from '@material/react-text-field';
import { connect } from 'react-redux';

// components
import Button from 'components/Button';

// thunks
import { forgotPassword } from 'modules/passwordReset';
import { displaySnackMessage } from 'modules/snack';

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
      email: fields.email as string,
    };
    this.props.forgotPassword(user)
    this.setState({ isLoading: true });
  }

  renderEnterOldPassword = () => {
    const { fields, errors } = this.state;

    return (
      <React.Fragment>
        <div className="form-cell">
          <TextField
            className="mdc-text-field--fullwidth"
            outlined
            label="Enter Old Password"
            leadingIcon={<MaterialIcon role="button" icon="email" initRipple={null}/>}
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
              value={fields.email}
              name="email"
              id="7"
              type="email"
              required={true}
              onBlur={this.validatePasswordField}
              onChange={this.handleInputChange}/>
          </TextField>
        </div>
      </React.Fragment>
    );
  }

  render() {
    return (
      <div className="register">
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
            {this.renderEnterOldPassword()}
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


export const mapStateToProps = state => ({
  user: state.user,
  error: state.error,
})

export const mapDispatchToProps = dispatch => ({
    forgotPassword: user => dispatch(forgotPassword(user)),
    displaySnackMessage: message => dispatch(displaySnackMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordPage);
