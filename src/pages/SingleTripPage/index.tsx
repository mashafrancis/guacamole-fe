import Button from 'components/Button';
import * as React from 'react';

// third-party libraries
import Card, {
  CardActionButtons,
  CardActionIcons,
  CardActions,
  CardMedia,
  CardPrimaryContent
} from '@material/react-card';
import { Cell, Grid, Row } from '@material/react-layout-grid';
import MaterialIcon from '@material/react-material-icon';
import * as moment from 'moment';
import { connect } from 'react-redux';

// pages
import DashboardPage from 'pages/DashboardPage';
import { NavLink } from 'react-router-dom';

// components
import Loader from 'components/Loader';

// thunks
import { displaySnackMessage } from 'modules/snack';
import { getSingleTrip } from 'modules/trips';

// styles
import './SingleTripPage.scss';

// interfaces
import { SingleTripPageProps, SingleTripPageState } from './interfaces';

export class SingleTripPage extends React.Component<SingleTripPageProps, SingleTripPageState> {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    const tripId = this.props.match.params.id;
    this.props.getSingleTrip(tripId)
      .then(() => this.setState({ isLoading: false }));
  }

  renderHeaderContent = () => {
    return (
      <div className="cover cover-image">
        <div className="head-title">
        </div>
      </div>
    );
  }

  renderBodyContent = () => {
    const { trip } = this.props;

    return (
      <div className="single-trip-page">
        <Grid>
          <Row>
            <Cell
              className="mdc-layout-grid__cell grid-start-3
                      mdc-layout-grid__cell--align-middle"
              columns={8}
              desktopColumns={8}
              tabletColumns={8}
              phoneColumns={4}
            >
              <div className="trip">
                <div className="trip-row trip-row__rules">
                  <div className="trip-row-content">
                    <h4 className="trip-title">Overview</h4>
                    <div className="trip-row-content__details">
                      <div className="trip-content-places">
                        <h3>NBO</h3>
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
                        <h3>NYC</h3>
                      </div>
                      <div className="trip-card">
                        <div className="trip-card__details">
                          <h5>Departure</h5>
                          <h4>{`${moment(trip.departure_date).format('LL')}`}</h4>
                        </div>
                        <div className="trip-card__details">
                          <h5>Arrival</h5>
                          <h4>{`${moment(trip.arrival_date).format('LL')}`}</h4>
                        </div>
                        <div className="trip-card__details">
                          <h5>Traveller</h5>
                          <h4>
                            {trip.traveller.first_name
                              ? `${trip.traveller.first_name} ${trip.traveller.last_name}`
                              : `${trip.traveller.username}`}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </Cell>
          </Row>
          <Row>
            <Cell
              className="mdc-layout-grid__cell grid-start-3
                      mdc-layout-grid__cell--align-middle trip-button"
              align="middle"
            >
              <Button
                name="Request"
                classes="mdc-button big-round-corner-button mdc-button--raised"
              />
            </Cell>
          </Row>
        </Grid>
      </div>
    );
  }

  renderTripsComponent = () => {
    const { isLoading } = this.state;
    return (
      isLoading
      ? <Loader />
      : <Grid>
        <Row>
          <Cell
            columns={12}
            desktopColumns={12}
            tabletColumns={8}
            phoneColumns={4}
          >
            {this.renderHeaderContent()}
            {this.renderBodyContent()}
          </Cell>
        </Row>
      </Grid>
    );
  }

  render() {
    return (
     <React.Fragment>
      <DashboardPage component={this.renderTripsComponent()}/>
    </React.Fragment>
    );
  }
}

export const mapStateToProps = state => ({
  trip: state.trips.trip,
  error: state.error,
});

export const mapDispatchToProps = dispatch => ({
  getSingleTrip: tripId => dispatch(getSingleTrip(tripId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleTripPage);
