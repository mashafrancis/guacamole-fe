import SearchInput from '@components/SearchInput';
import { TextField } from '@material-ui/core';
import * as React from 'react';

// third-party libraries
import {
  Cell,
  Grid,
  Row
} from '@material/react-layout-grid';
import MaterialIcon from '@material/react-material-icon';
import { connect } from 'react-redux';

// components
import Loader from '@components/Loader';
import TripCard from '@components/TripCard';

// thunks
import { displaySnackMessage } from '@modules/snack';
import { getAllTrips, requestTrip } from '@modules/trips';

// pages
import DashboardContainer from '@pages/DashboardContainer';

// interfaces
import { ExplorePageProps, ExplorePageState } from './interfaces';

export class ExplorePage extends React.Component<ExplorePageProps, ExplorePageState> {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    this.props.getAllTrips()
      .then(() => this.setState({ isLoading: false }));
  }

  redirectToSingleTrip = (trip_id) => {
    this.props.history.push(`/trips/${trip_id}`);
  }

  handleSubmitTripRequest = (tripId) => {
    this.setState({ isLoading: false });
    this.props.requestTrip(tripId);
  }

  renderSearchField = () => (
    <div className="form-cell">
      {SearchInput}
    </div>
  )

  /**
   * @description This method renders the card contents
   *
   * @returns {JSX}
   */
  renderExploreContent = (trips) => {
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
                  redirect={this.redirectToSingleTrip}
                  requestTrip={this.handleSubmitTripRequest}
                />
              );
            })
          }
        </Row>
      </Grid>
    );
  }

  render() {
    const { isLoading } = this.state;
    const { trips } = this.props;

    return (
      isLoading
      ? <Loader />
      : <React.Fragment>
        <DashboardContainer component={this.renderExploreContent(trips)} />
      </React.Fragment>
    );
  }
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
