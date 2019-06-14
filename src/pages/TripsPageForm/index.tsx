import * as React from 'react';

// third-party libraries
import { Cell, Grid, Row } from '@material/react-layout-grid';
import MaterialIcon from '@material/react-material-icon';
import Select from '@material/react-select';
import TextField, { HelperText, Input } from '@material/react-text-field';
import { Calendar } from 'react-date-range';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

// components
import AuthHeader from 'components/AuthHeader';
import Button from 'components/Button';

// thunks
import { displaySnackMessage } from 'modules/snack';
import { addNewtrip } from 'modules/trips';

// interfaces
import { TripsPageFormProps, TripsPageFormState } from './interfaces';

// styles
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './TripsPageForm.scss';

export class TripsPageForm extends React.Component<TripsPageFormProps, TripsPageFormState> {
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
   * Handles the submission on successful validation
   *
   * @param {event} event DOM event
   *
   * @returns {void}
   */
  onSubmit = (event) => {
    event.preventDefault();
    const { fields } = this.state;
    const trip = {
      origin: fields.origin as string,
      destination: fields.destination as string,
      departure_date: fields.departure_date as string,
      arrival_date: fields.arrival_date as string,
    };

    this.setState({ isLoading: true });

    this.props.addNewTrip(trip)
      .then(() => {
        this.setState({ isLoading: false });
      });
  }

  renderTripsForm = () => {
    const { fields, errors } = this.state;

    return (
      <React.Fragment>
        <div className="form-cell">
          <TextField
            className="mdc-text-field--fullwidth"
            outlined
            label="Origin"
            leadingIcon={<MaterialIcon role="button" icon="trip_origin" initRipple={null}/>}
            helperText={
              <HelperText
                className="mdc-text-field-helper-text--validation-msg"
                isValidationMessage={true}
                persistent={true}
                validation={true}>
                {''}
              </HelperText>}
          >
            <Input
              value={fields.origin}
              name="origin"
              id="10"
              type="text"
              onChange={this.handleInputChange}
            />
          </TextField>
        </div>
        <div className="form-cell">
          <TextField
            className="mdc-text-field--fullwidth"
            outlined
            label="Destination"
            leadingIcon={<MaterialIcon role="button" icon="place" initRipple={null}/>}
            helperText={
              <HelperText
                className="mdc-text-field-helper-text--validation-msg"
                isValidationMessage={true}
                persistent={true}
                validation={true}>
                {''}
              </HelperText>}
          >
            <Input
              value={fields.destination}
              name="destination"
              id="11"
              type="text"
              onChange={this.handleInputChange}
            />
          </TextField>
        </div>
        <div className="form-cell">
          <TextField
            className="mdc-text-field--fullwidth"
            outlined
            label="Departure Date"
            leadingIcon={<MaterialIcon role="button" icon="calendar_today" initRipple={null}/>}
            helperText={
              <HelperText
                className="mdc-text-field-helper-text--validation-msg"
                isValidationMessage={true}
                persistent={true}
                validation={true}>
                {''}
              </HelperText>}
          >
            <Input
              value={fields.departure_date}
              name="departure_date"
              id="12"
              type="text"
              onChange={this.handleInputChange}
            />
          </TextField>
        </div>
        <div className="form-cell">
          <TextField
            className="mdc-text-field--fullwidth"
            outlined
            label="Arrival Date"
            leadingIcon={<MaterialIcon role="button" icon="calendar_today" initRipple={null}/>}
            helperText={
              <HelperText
                className="mdc-text-field-helper-text--validation-msg"
                isValidationMessage={true}
                persistent={true}
                validation={true}>
                {''}
              </HelperText>}
          >
            <Input
              value={fields.arrival_date}
              name="arrival_date"
              id="12"
              type="text"
              onChange={this.handleInputChange}
            />
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
          forwardButtonName="Home"
          backwardButtonName="Back"
          forwardLink={'/'}
          backwardLink={'/dashboard/trips'}
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
              <h1 className="headline-2">Add a new trip</h1>
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
            {this.renderTripsForm()}
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
              name={isLoading ? 'Please wait...' : 'Add new trip'}
              id="cc-register"
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
  error: state.error,
});

export const mapDispatchToProps = dispatch => ({
  addNewTrip: trip => dispatch(addNewtrip(trip)),
  displaySnackMessage: message => dispatch(displaySnackMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TripsPageForm);
