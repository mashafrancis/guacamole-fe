// third-party libraries
import MaterialIcon from '@material/react-material-icon';
import TextField, { HelperText, Input } from '@material/react-text-field';
// components
import AuthHeader from 'components/AuthHeader';
import Button from 'components/Button';
// thunks
import { displaySnackMessage } from 'modules/snack';
import { addNewTrip } from 'modules/trips';
import * as React from 'react';
// styles
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { connect } from 'react-redux';
// interfaces
import { TripsPageFormProps, TripsPageFormState } from './interfaces';
import './TripsPageForm.scss';
import { SelectCountryRegionBox } from 'components/SelectBox';
import { Grid, Container, InputAdornment, createMuiTheme  } from '@material-ui/core';

export const TripsPageForm:React.FunctionComponent<TripsPageFormProps> = (props) => {
  const [ state, setState] = React.useState<TripsPageFormState>({
      isLoading: false,
      isValid: true,
      focused: false,
      locations: {
        origin: {
          country: "Kenya",
          region: "",
        },
        destination: {
          country: "Kenya",
          region: ""
        }
      },
      dates: {},
      errors: {},
  })

  /**
   * Handles text field input change
   *
   * @param {event} event input change event
   *
   * @returns {void}
   */
  const handleInputChange = (event) => {
    const { name: field, value } = event.target;
    setState(prevState => ({
      ...state, dates: {
        ...prevState.dates,
        [field]: value,
      }
    }));
  }

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
      departure_date: dates.departure_date as string,
      arrival_date: dates.arrival_date as string,
    };

    setState({...state, isLoading: true });

    props.addNewTrip(trip)
      .then(() => {
        setState({...state, isLoading: false });
      });
  }
  const handleOnSelect = (location:string, field:string) => (event) =>{
    setState({ ...state, locations:{
      ...state.locations, [location]: {...state.locations[location], [field]: event.target.value}
    }})
  }

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
              value={dates.departure_date}
              name="departure_date"
              id="12"
              type="text"
              onChange={handleInputChange}
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
              value={dates.arrival_date}
              name="arrival_date"
              id="12"
              type="text"
              onChange={handleInputChange}
            />
          </TextField>
        </div>
      </React.Fragment>
    );
  }

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
  })()
}

export const mapStateToProps = state => ({
  error: state.error,
});

export const mapDispatchToProps = dispatch => ({
  addNewTrip: trip => dispatch(addNewTrip(trip)),
  displaySnackMessage: message => dispatch(displaySnackMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TripsPageForm);
