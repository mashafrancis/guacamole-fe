import { authService } from '@utils/auth';
import * as React from 'react';

// third-party libraries
import {
  Cell,
  Grid,
  Row
} from '@material/react-layout-grid';
import { connect } from 'react-redux';

// components
import Loader from '@components/Loader';
import SearchInput from '@components/SearchInput';
import TripCard from '@components/TripCard';

// thunks
import { displaySnackMessage } from '@modules/snack';
import { getAllTrips, requestTrip } from '@modules/trips';

// pages
import DashboardContainer from '@pages/DashboardContainer';

// interfaces
import { ExplorePageProps } from './interfaces';
import SingleTripPage from '@pages/SingleTripPage';

export const ExplorePage: React.FunctionComponent<ExplorePageProps> = props => {
  const [ isLoading, setIsLoading ] = React.useState<Boolean>(false)
  const { trips, history } = props
  const [ showingSingleTrip, setShowingSingleTrip ] = React.useState<Boolean>(false)
  const [ selectedTripId, setSelectedTripId ] = React.useState<string>()

  React.useEffect(()=> {
    props.getAllTrips()
      .then(() => setIsLoading(false));
  }) 


  const handleSubmitTripRequest = (tripId) => {
    setIsLoading(false);
    props.requestTrip(tripId);
  }

  const isSameUser = (trip) => {
    const user = authService.getUser();
    return (user.userdata.id && trip.traveller);
  }
  const renderSearchField = () => (
    <div className="form-cell">
      {SearchInput}
    </div>
  )

  /**
   * @description This method renders the card contents
   *
   * @returns {JSX}
   */
  const renderExploreContent = (trips) => {
    return (
      <Grid>
        <Row>
          <Cell
            className="mdc-layout-grid__cell grid-start-5 mdc-layout-grid__cell--align-middle"
            align="middle"
            order={5}
            columns={4}
            desktopColumns={4}
            tabletColumns={4}
            phoneColumns={4}
          >
              <SearchInput />
          </Cell>
        </Row>
        <Row>
          {
            trips.map((trip) => {
              return (
                <TripCard
                  key={trip.id}
                  trip={trip}
                  requestTrip={this.handleSubmitTripRequest}
                  isOwner={!!this.isSameUser(trip)}
                  setSelectedTrip={setSelectedTripId}
                  setShowingSingleTrip={setShowingSingleTrip}
                />
              );
            })
          }
        </Row>
      </Grid>
    );
  }

  return (
    isLoading
    ? <Loader />
    : showingSingleTrip ? <SingleTripPage history={history} selectedTripId={selectedTripId} setSelectedTripId={setSelectedTripId} setShowingSingleTrip={setShowingSingleTrip} /> : renderExploreContent(trips)
  );
}


export const mapStateToProps = state => ({
  trips: state.trips.data,
  error: state.error,
});

export const mapDispatchToProps = dispatch => ({
  getAllTrips: () => dispatch(getAllTrips()),
  displaySnackMessage: message => dispatch(displaySnackMessage(message)),
  requestTrip: tripId => dispatch(requestTrip(tripId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExplorePage);
