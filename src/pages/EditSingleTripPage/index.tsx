import * as React from 'react';

// third-party libraries
import DateFnsUtils from '@date-io/date-fns';
import {
  Container,
  Grid,
  IconButton,
  InputAdornment
} from '@material-ui/core';
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { Cell, Row } from '@material/react-layout-grid';
import MaterialIcon from '@material/react-material-icon';
import { connect } from 'react-redux';

// components
import AuthHeader from 'components/AuthHeader';
import Button from 'components/Button';
import { SelectCountryRegionBox } from 'components/SelectBox';

// thunks
import { displaySnackMessage } from 'modules/snack';
import { editTrip } from 'modules/trips';

// interfaces
import {
  EditSingleTripPageProps,
  EditSingleTripPageState
} from './interfaces';

// styles
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import '../TripsPageForm/TripsPageForm.scss';

export const EditSingleTripPage: React.FunctionComponent<EditSingleTripPageProps> = (props) => {
  const [state, setState] = React.useState<EditSingleTripPageState>({
    isLoading: false,
    isValid: true,
    focused: false,
    fields: {},
    locations: {
      origin: {
        country: 'Kenya',
        region: '',
      },
      destination: {
        country: 'Kenya',
        region: '',
      },
    },
    errors: {},
    dates: {},
    tripToEdit: {
      origin: '',
      destination: '',
      departure_date: '',
      arrival_date: '',
    },
  });

  const tripId = window.location.pathname
    .replace('http://', '')
    .split('/');

  const tripValue = props.trips.filter(res => res.id.includes(tripId[3]));

  const [selectedDepartureDate, handleDepartureDateChange] = React.useState(tripValue[0].departure_date);
  const [selectedArrivalDate, handleArrivalDateChange] = React.useState(tripValue[0].arrival_date);

  /**
   * Handles the submission on successful validation
   *
   * @param {event} event DOM event
   *
   * @returns {void}
   */
  const onSubmit = (event) => {
    event.preventDefault();
    const { locations, dates } = state;
    const trip = {
      origin: `${Object.values(locations.origin).join(',')}` as string,
      destination: `${Object.values(locations.destination).join(',')}` as string,
      departure_date: selectedDepartureDate,
      arrival_date: selectedArrivalDate,
    };

    setState({ ...state, isLoading: true });

    props.editTrip(trip)
      .then(() => {
        setState({ ...state, isLoading: false });
      });
  }

  const handleOnSelect = (location: string, field: string) => (event) => {
    setState({ ...state, locations: {
      ...state.locations, [location]: { ...state.locations[location], [field]: event.target.value },
    }});
  };

  const renderTripsForm = () => {
    const { locations, dates, errors } = state;

    return (
      <React.Fragment>
        <div >
          <SelectCountryRegionBox
            fields={locations.origin}
            location="origin"
            updateField={handleOnSelect}
          />
        </div>
        <div className="form-cell">
          <SelectCountryRegionBox
            fields={locations.destination}
            location="destination"
            updateField={handleOnSelect}
          />
        </div>
        <div className="form-cell">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              className="mdc-text-field--fullwidth"
              name="arrival_date"
              inputVariant="outlined"
              openTo="date"
              format="dd/MM/yyyy"
              value={selectedDepartureDate}
              onChange={handleDepartureDateChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton>
                      <MaterialIcon role="button" icon="calendar_today" initRipple={null}/>
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </MuiPickersUtilsProvider>
          <p
            className="mdc-text-field-helper-text mdc-text-field-helper-text--validation-msg
            mdc-text-field-helper-text--persistent mdc-text-field-helper-text--validation-msg"
            aria-hidden="false" />
        </div>
        <div className="form-cell">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              className="mdc-text-field--fullwidth"
              name="arrival_date"
              inputVariant="outlined"
              openTo="date"
              format="dd/MM/yyyy"
              value={selectedArrivalDate}
              onChange={handleArrivalDateChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton>
                      <MaterialIcon role="button" icon="calendar_today" initRipple={null}/>
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          <p
            className="mdc-text-field-helper-text mdc-text-field-helper-text--validation-msg
            mdc-text-field-helper-text--persistent mdc-text-field-helper-text--validation-msg"
            aria-hidden="false" />
          </MuiPickersUtilsProvider>
        </div>
      </React.Fragment>
    );
  };

  return (() => {
    const { isLoading } = state;

    return (
      <div className="register">
        <AuthHeader
          forwardButtonName="Home"
          backwardButtonName="Back"
          forwardLink={'/'}
          backwardLink={'/trips'}
        />
        <Container maxWidth="sm">
          <Grid container direction="column" spacing={2}>
            <Grid item xs>
              <h1 className="headline-2">Edit your trip</h1>
            </Grid>
            <Grid container direction="row" spacing={2}>
              <Grid item xs>
                {renderTripsForm()}
              </Grid>
            </Grid>
            <Grid item xs >
              <Button
                  type="button"
                  name={isLoading ? 'Please wait...' : 'Edit your trip'}
                  id="cc-register"
                  onClick={onSubmit}
                  classes="mdc-button big-round-corner-button mdc-button--raised"
                />
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  })();
};

export const mapStateToProps = state => ({
  error: state.error,
  trips: state.trips.user_trips,
});

export const mapDispatchToProps = dispatch => ({
  editTrip: trip => dispatch(editTrip(trip)),
  displaySnackMessage: message => dispatch(displaySnackMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditSingleTripPage);
