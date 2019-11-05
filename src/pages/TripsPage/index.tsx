import * as React from 'react';

// third-party libraries
import Dialog, {
  DialogButton,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '@material/react-dialog';
import Fab from '@material/react-fab';
import { Cell, Grid, Row } from '@material/react-layout-grid';
import MaterialIcon from '@material/react-material-icon';
import * as moment from 'moment';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

// pages
import DashboardPage from 'pages/DashboardPage';

// components
import LazyLoader from 'components/LazyLoader';
import Table from 'components/Table';
import UserTripCard from 'components/UserTripCard';

// thunks
import { displaySnackMessage } from 'modules/snack';
import {
  deleteSingleTrip,
  getAllUserTrips
} from 'modules/trips';

import { TripsPageProps, TripsPageState } from './interfaces';

export const TripsPage: React.FunctionComponent<TripsPageProps> = (props) => {
  const [state, setState] = React.useState<TripsPageState>({
    isLoading: true,
    isEditMode: false,
    isDeleteModal: false,
    trips: [],
    trip: {
      id: '',
      origin: '',
      destination: '',
      departure_date: '',
      arrival_date: '',
      space_available: '',
    },
    action: '',
    trip_id: '',
  });

  React.useEffect(() => {
    props.getAllUserTrips()
      .then(() => setState({ ...state, trips: props.trips }))
      .then(() => setState({ ...state, isLoading: false }));
  },              []);

  React.useEffect(() => {
    switch (state.action) {
      case 'delete':
        props.deleteSingleTrip(state.trip_id)
          .then(() => setState({
            ...state,
            action: '',
            isDeleteModal: false, isLoading: false,
          }));
        props.getAllUserTrips()
          .then(() => setState({ ...state, trips: props.trips }))
          .then(() => setState({ ...state, isLoading: false }));
        break;
      case 'dismiss':
        setState({ ...state, isDeleteModal: false });
        break;
    }
  },              [state.action]);

  const handleDelete = (trip) => {
    switch (state.action) {
      case 'delete':
        props.deleteSingleTrip(trip.id)
          .then(() => setState({
            ...state,
            action: '',
            isDeleteModal: false, isLoading: false,
          }));
        break;
      case 'dismiss':
        setState({ ...state, isDeleteModal: false });
        break;
    }
  };

  const redirectToSingleTrip = (trip_id) => {
    props.history.push(`/trips/${
      state.trips
    }`);
  };

  const renderHeaderContent = () => {
    return (
      <div className="cover">
        <div className="head-title">
          <div className="title-cover title-cover-page">
            <h3>Recent Trips</h3>
          </div>
        </div>
      </div>
    );
  };

  const DeleteModal = () => (
    <Dialog
      open={state.isDeleteModal}
      onClose={action => setState({ ...state, action, isDeleteModal: false })}
    >
      <DialogTitle>DELETE TRIP</DialogTitle>
      <DialogContent>
        <h5>Do you confirm deletion of trip?</h5>
      </DialogContent>
      <DialogFooter>
        <DialogButton action="delete">Delete</DialogButton>
        <DialogButton action="dismiss" isDefault>Dismiss</DialogButton>
      </DialogFooter>
    </Dialog>
  );

  const ActionButtons = trip => (
    <div key={trip.id} className="action-buttons">
      <span onClick={() => setState({ ...state, isEditMode: true })}>
      <Link to={`${props.match.url}/edit/${trip.id}`}>
        <MaterialIcon className="action-buttons__edit" role="button" icon="edit" initRipple={null}/>
      </Link>
      </span>
      <span id={trip.id} onClick={() => setState({ ...state, trip_id: trip.id, isDeleteModal: true })}>
      <MaterialIcon id={trip.id} className="action-buttons__delete" role="button" icon="delete" initRipple={null}/>
      </span>
    </div>
  );

  const renderUserTripsMobile = trips => (
    <React.Fragment>
      <LazyLoader height={110}>
        <div className="user-trip-cards">
        {
          trips.map((trip) => {
            return (
             <UserTripCard
               key={trip.id}
               trip={trip}
               match={props.match}
               onDelete={() => setState({ ...state, trip_id: trip.id, isDeleteModal: true })}
             />
            );
          })
        }
        </div>
      </LazyLoader>
    </React.Fragment>
  );

  const renderUserTrips = (trips) => {
    const tableHeaders = {
      Origin: { valueKey: 'origin', colWidth: '30' },
      Destination: { valueKey: 'destination', colWidth: '30' },
      Departure: { valueKey: 'departure_date', colWidth: '30' },
      Arrival: { valueKey: 'arrival_date', colWidth: '30' },
      Actions: { valueKey: 'actions' },
    };

    const tableValues = trips.map(trip => ({
      id: trip.id,
      origin: trip.origin,
      destination: trip.destination,
      departure_date: `${moment(trip.departure_date).format('LL')}`,
      arrival_date: `${moment(trip.arrival_date).format('LL')}`,
      actions: ActionButtons(trip),
    }));

    return (
      (window.innerWidth < 539)
        ? renderUserTripsMobile(trips)
        :
        <LazyLoader height={110}>
        <div className="user-trips-table">
          <Table
            keys={tableHeaders}
            values={tableValues}
          />
        </div>
        </LazyLoader>
    );
  };

  const blankContent = () => (
    <React.Fragment>
      <div className="blank-content">
        <h4>You don't have any trip scheduled</h4>
        <h5>Tap + to create one</h5>
        <NavLink to={'/trips/new-trip'}>
          <Fab className="create-trip-button" icon={<MaterialIcon icon="add" initRipple={null}/>}
          />
        </NavLink>
      </div>
    </React.Fragment>
  );

  const renderTripsComponent = () => {
    return (
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
              <div className="cover">
                <div className="head-title">
                  <div className="title-cover title-cover-page">
                    <h3>Recent Trips</h3>
                  </div>
                </div>
              </div>
            </Cell>
          </Row>
        <Row>
          <Cell
            columns={12}
            desktopColumns={12}
            tabletColumns={8}
            phoneColumns={4}
          >
            {DeleteModal()}
            {!props.trips.length || undefined
              ? blankContent()
              : renderUserTrips(props.trips)}
          </Cell>
        </Row>
        <Row>
          <Cell>
            <NavLink to={'/trips/new-trip'}>
              <Fab className="create-trip-button" icon={<MaterialIcon icon="add" initRipple={null}/>}
              />
            </NavLink>
          </Cell>
        </Row>
      </Grid>
    );
  };

  return (
    <React.Fragment>
      <DashboardPage component={renderTripsComponent()}/>
    </React.Fragment>
  );
};

export const mapStateToProps = state => ({
  trips: state.trips.user_trips,
});

export const mapDispatchToProps = dispatch => ({
  getAllUserTrips: () => dispatch(getAllUserTrips()),
  deleteSingleTrip: id => dispatch(deleteSingleTrip(id)),
  displaySnackMessage: message => dispatch(displaySnackMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TripsPage);
