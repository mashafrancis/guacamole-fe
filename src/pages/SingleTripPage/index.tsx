import * as React from 'react';

// third-party libraries
import { Cell, Grid, Row } from '@material/react-layout-grid';
import MaterialIcon from '@material/react-material-icon';
import * as moment from 'moment';
import { connect } from 'react-redux';

// pages
import DashboardContainer from '@pages/DashboardContainer';

// components
import AuthHeader from '@components/AuthHeader';
import Button from '@components/Button';
import Loader from '@components/Loader';
import TripCard from '@components/TripCard';

// thunks
import { getAllUserTrips, getSingleTrip, requestTrip } from '@modules/trips';

// utils
import countryString from '@utils/helpers/countryString';

// styles
import './SingleTripPage.scss';

// interfaces
import TripsModal from '@components/TripsModal';
import { SingleTripPageProps, SingleTripPageState } from './interfaces';

export const SingleTripPage: React.FunctionComponent<SingleTripPageProps> = (props) => {
  const [state, setState] = React.useState<SingleTripPageState>({
    isLoading: true,
    modalOpen: false,
    trips: [],
  });

  const tripId = props.selectedTripId;

  React.useEffect(() => {
    props.getSingleTrip(tripId)
      .then(() => setState({ ...state, isLoading: false }))
      .then(() => props.getAllUserTrips()
      .then(() => setState({ ...state, trips: props.trips }))
      .then(() => setState({ ...state, isLoading: false })));
    return () => setState({...state, isLoading: true})
  },[tripId]);

  const handleModalOpen = () => {
    setState({ ...state, modalOpen: true });
  };

  const handleModalClose = () => {
    setState({ ...state, modalOpen: false });
  };

  const handleRequestTrip = () => {
    handleModalClose();
    props.requestTrip(props.trip.id);
  };

  const handleShowExplorePage = () => {
    props.setShowingSingleTrip(false)
  }


  const BodyContent = () => {
    const { trip, setShowingSingleTrip, setSelectedTripId } = props;
    return (
      <div className="single-trip-page">
        <Grid>
          <Row>
            <Cell
              className="mdc-layout-grid__cell grid-start-3 mdc-layout-grid__cell--align-middle"
              columns={8}
              desktopColumns={8}
              tabletColumns={8}
              phoneColumns={4}
            >
              <div className="trip">
                <div className="single-trip-card">
                  <div className="single-trip-card__details">
                    <h3>{`Trip to ${trip.destination}`}</h3>
                    <h4>
                      {`${moment(trip.departure_date).format('LL')}`} -
                      {`${moment(trip.arrival_date).format('LL')}`}
                    </h4>
                    <Cell
                      className="mdc-layout-grid__cell grid-start-3
                      mdc-layout-grid__cell--align-middle trip-button"
                      align="middle"
                    >
                      <Button
                        name="REQUEST"
                        classes="mdc-button big-round-corner-button mdc-button--raised"
                        onClick={handleModalOpen}
                      />
                      <TripsModal
                        open={state.modalOpen}
                        handleClose={handleModalClose}
                        handleSubmitRequest={handleRequestTrip} />
                    </Cell>
                  </div>
                </div>
                <div className="trip-content-places">
                  <h3>{trip.origin}</h3>
                  <MaterialIcon
                    className="trip-flight-icon__origin"
                    role="button"
                    icon="flight"
                    hasRipple={true}
                    initRipple={null}/>
                  <hr className="horizontal-line" />
                  <MaterialIcon
                    className="trip-flight-icon"
                    role="button"
                    icon="place"
                    hasRipple={true}
                    initRipple={null}/>
                  <h3>{trip.destination}</h3>
                </div>
              </div>
            </Cell>
          </Row>
          <Row>
            <Cell
              className="mdc-layout-grid__cell grid-start-3 mdc-layout-grid__cell--align-middle"
              columns={8}
              desktopColumns={8}
              tabletColumns={8}
              phoneColumns={4}
            >
              <h4>Explore More Trips.</h4>
            </Cell>
          </Row>
          <Row>
            {
              props.trips.map((trip) => {
                return (
                  <TripCard
                    key={trip.id}
                    trip={trip}
                    requestTrip={handleRequestTrip}
                    isOwner={true}
                    setSelectedTrip={setSelectedTripId}
                    setShowingSingleTrip={setShowingSingleTrip}
                  />
                );
              })
            }
          </Row>
        </Grid>
      </div>
    );
  };
  const { history, setShowingSingleTrip } = props
  return (
    state.isLoading
      ? <Loader />
      :
      <div className="register">
      <AuthHeader
        backwardButtonName={'Back'}
        backwardAction={ () => setShowingSingleTrip(false)}/>
      <Grid>
        <Row>
          <Cell
            columns={12}
            desktopColumns={12}
            tabletColumns={8}
            phoneColumns={4}
          >
            {BodyContent()}
          </Cell>
        </Row>
      </Grid>
      </div>
  );
};

export const mapStateToProps = state => ({
  trips: state.trips.user_trips,
  trip: state.trips.trip,
  error: state.error,
});

export const mapDispatchToProps = dispatch => ({
  getAllUserTrips: () => dispatch(getAllUserTrips()),
  getSingleTrip: tripId => dispatch(getSingleTrip(tripId)),
  requestTrip: tripIp => dispatch(requestTrip(tripIp)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleTripPage);
