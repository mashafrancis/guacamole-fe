import * as React from 'react';

// third-party libraries
import DateFnsUtils from '@date-io/date-fns';
import {
  Container,
  Grid,
  IconButton,
  InputAdornment,
} from '@material-ui/core';
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import MaterialIcon from '@material/react-material-icon';
import { connect } from 'react-redux';

// components
import AuthHeader from '@components/AuthHeader';
import Button from '@components/Button';
import { SelectCountryRegionBox } from '@components/SelectBox';
import { SelectLuggageSpace } from '@components/SelectLuggageSpace';

// thunks
import { displaySnackMessage } from '@modules/snack';
import { addNewTrip } from '@modules/trips';

// styles
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './TripsPageForm.scss';

// interfaces
import { TripsPageFormProps, TripsPageFormState } from './interfaces';

export const TripsPageForm: React.FunctionComponent<TripsPageFormProps> = (props) => {
  const [state, setState] = React.useState<TripsPageFormState>({
    fields: {},
    isLoading: false,
    isValid: true,
    focused: false,
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
    dates: {},
    errors: {},
  });

  const [selectedDepartureDate, handleDepartureDateChange] = React.useState(new Date());
  const [selectedArrivalDate, handleArrivalDateChange] = React.useState(new Date());

  const [selectedSpace, setSpace] = React.useState({
    space: '',
  });

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
      space_available: selectedSpace.space,
    };

    setState({ ...state, isLoading: true });

    props.addNewTrip(trip)
      .then(() => {
        setState({ ...state, isLoading: false });
      });
  };

  const handleNavigationAction = (to: string) => {
    document.location.href = to
  }

  const handleOnSelect = (location: string, field: string) => (event) => {
    setState({ ...state, locations: {
      ...state.locations, [location]: { ...state.locations[location], [field]: event.target.value },
    }});
  };

  const handleSpaceChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    setSpace(oldSpace => ({
      ...oldSpace,
      [event.target.name as string]: event.target.value,
    }));
  };

  const renderTripsForm = () => {
    const { locations, dates, errors } = state;
    return (
      <React.Fragment>
          <SelectCountryRegionBox
            fields={locations.origin}
            location="origin"
            updateField={handleOnSelect}
          />
        <div className="form-cell">
          <SelectCountryRegionBox
            fields={locations.destination}
            location="destination"
            updateField={handleOnSelect}
          />
        </div>
        <div className="form-cell">
          <Grid container spacing={2} direction="row">
            <Grid item xs>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              className="mdc-text-field--fullwidth"
              name="arrival_date"
              size="small"
              inputVariant="outlined"
              label="Departure Date"
              openTo="date"
              format="dd/MM/yyyy"
              value={selectedDepartureDate}
              onChange={handleDepartureDateChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton>
                      <MaterialIcon role="button" icon="date_range" initRipple={null}/>
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
            </Grid>
            <Grid item xs>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              className="mdc-text-field--fullwidth"
              name="arrival_date"
              size="small"
              inputVariant="outlined"
              label="Arrival Date"
              openTo="date"
              format="dd/MM/yyyy"
              value={selectedArrivalDate}
              onChange={handleArrivalDateChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton>
                      <MaterialIcon role="button" icon="date_range" initRipple={null}/>
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
            </Grid>
          </Grid>
        </div>
        <div className="form-cell">
          <SelectLuggageSpace
            updateField={handleSpaceChange}
            fields={selectedSpace.space}
          />
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
          forwardAction={() => handleNavigationAction('/')}
          backwardAction={() => handleNavigationAction('/trips')}
        />
        <Container maxWidth="sm">
          <Grid container direction="column" spacing={2}>
            <Grid item xs>
              <h1 className="headline-2">Add a new trip</h1>
            </Grid>
            <Grid container direction="row" spacing={2}>
              <Grid item xs>
                {renderTripsForm()}
              </Grid>
            </Grid>
            <Grid item xs >
              <Button
                  type="button"
                  name={isLoading ? 'Please wait...' : 'Add new trip'}
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
});

export const mapDispatchToProps = dispatch => ({
  addNewTrip: trip => dispatch(addNewTrip(trip)),
  displaySnackMessage: message => dispatch(displaySnackMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TripsPageForm);
