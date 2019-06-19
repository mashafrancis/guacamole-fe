import * as React from 'react';

// third-party libraries
import Fab from '@material/react-fab';
import { Cell, Grid, Row } from '@material/react-layout-grid';
import MaterialIcon from '@material/react-material-icon';
import TextField, { Input } from '@material/react-text-field';
import MaterialTable from 'material-table';

// pages
import DashboardPage from 'pages/DashboardPage';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

// components
import Loader from 'components/Loader';
import TripCard from 'components/TripCard';

// thunks
import { displaySnackMessage } from 'modules/snack';
import { getAllUserTrips } from 'modules/trips';

import { TripsPageProps, TripsPageState } from './interfaces';

export class TripsPage extends React.Component<TripsPageProps, TripsPageState> {
  /*
   * Header for the trips table
   */
  tableHeaders = [
    { title: 'Origin', field: 'origin' },
    { title: 'Destination', field: 'destination' },
    { title: 'Departure', field: 'departure_date' },
    { title: 'Arrival', field: 'arrival_date' },
  ];

  state = {
    isLoading: true,
  };

  componentDidMount() {
    this.props.getAllUserTrips()
      .then(() => this.setState({ isLoading: false }));
  }

  redirectToSingleTrip = (trip_id) => {
    this.props.history.push(`/trips/${trip_id}`);
  }

  renderHeaderContent = () => {
    return (
      <div className="cover">
        <div className="head-title">
          <div className="title-cover title-cover-page">
            <h3>Recent Trips</h3>
          </div>
        </div>
      </div>
    );
  }

  renderUserTrips = () => {
    const { isLoading } = this.state;
    const trips = this.props.trips.map(trip => ({
      ...trip,
    }));

    return (
      isLoading
      ? <Loader />
      : <div className="user-trips">
        <MaterialTable
          title="Recent Trips"
          columns={this.tableHeaders}
          data={trips}
          // editable={{
          //   onRowAdd: newData =>
          //     new Promise(resolve => {
          //       setTimeout(() => {
          //         resolve();
          //         const data = [...state.data];
          //         data.push(newData);
          //         setState({ ...state, data });
          //       }, 600);
          //     }),
          //   onRowUpdate: (newData, oldData) =>
          //     new Promise(resolve => {
          //       setTimeout(() => {
          //         resolve();
          //         const data = [...state.data];
          //         data[data.indexOf(oldData)] = newData;
          //         setState({ ...state, data });
          //       }, 600);
          //     }),
          //   onRowDelete: oldData =>
          //     new Promise(resolve => {
          //       setTimeout(() => {
          //         resolve();
          //         const data = [...state.data];
          //         data.splice(data.indexOf(oldData), 1);
          //         setState({ ...state, data });
          //       }, 600);
          //     }),
          // }}
        />
        <NavLink to={'/trips/new-trip'}>
          <Fab className="create-trip-button" icon={<MaterialIcon icon="add" initRipple={null}/>}
          />
        </NavLink>
      </div>
    );
  }

  renderBodyContent = () => {
    const { trips } = this.props;

    return (
      trips.length > 0
      ? this.renderUserTrips()
      : (<React.Fragment>
        <div className="cover">
        <div className="head-title">
          <div className="title-cover title-cover-page">
            <h3>Recent Trips</h3>
          </div>
        </div>
      </div>
        <div className="blank-content">
        <h4>You don't have any trip scheduled</h4>
          <h5>Tap + to create one</h5>
        <NavLink to={'/trips/new-trip'}>
          <Fab className="create-trip-button" icon={<MaterialIcon icon="add" initRipple={null}/>}
          />
        </NavLink>
      </div>
        </React.Fragment>)
    );
  }

  renderTripsComponent = () => {
    return (
      <Grid>
        <Row>
          <Cell
            columns={12}
            desktopColumns={12}
            tabletColumns={8}
            phoneColumns={4}
          >
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
  trips: state.trips.data,
});

export const mapDispatchToProps = dispatch => ({
  getAllUserTrips: () => dispatch(getAllUserTrips()),
  displaySnackMessage: message => dispatch(displaySnackMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TripsPage);
