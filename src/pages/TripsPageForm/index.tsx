// third-party libraries
import { Cell, Grid, Row } from '@material/react-layout-grid';
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

export const TripsPageForm:React.FunctionComponent<TripsPageFormProps> = (props) => {
  const [ state, setState] = React.useState<TripsPageFormState>({
    isLoading: false,
      isValid: true,
      focused: false,
      fields: {
        country: "Kenya",
        region:''
      },
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
      ...state, fields: {
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
  const onSubmit = (event) => {
    event.preventDefault();
    const { fields } = state;
    const trip = {
      origin: fields.country as string,
      destination: fields.region as string,
      departure_date: fields.departure_date as string,
      arrival_date: fields.arrival_date as string,
    };

    setState({...state, isLoading: true });

    props.addNewTrip(trip)
      .then(() => {
        setState({...state, isLoading: false });
      });
  }
  const handleOnSelect = (field:string) => (event) =>{
    setState({ ...state, fields:{
      ...state.fields, [field]: event.target.value
    }})
  }

  const renderTripsForm = () => {
    const { fields, errors } = state;
    return (
      <React.Fragment>
        <div className="form-cell">
          <SelectCountryRegionBox fields={fields} updateField={handleOnSelect}/>
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
              value={fields.arrival_date}
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
            {renderTripsForm()}
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
              onClick={onSubmit}
              classes="mdc-button big-round-corner-button mdc-button--raised"
            />
          </Cell>
          </Row>
        </Grid>
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
