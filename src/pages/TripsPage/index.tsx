import * as React from 'react';

// components
import LazyLoader from '@components/LazyLoader';
import TripCard from '@components/TripCard';
import UserTripCard from '@components/UserTripCard';

// third-party libraries
import Dialog, { DialogButton, DialogContent, DialogFooter, DialogTitle } from '@material/react-dialog';
import Fab from '@material/react-fab';
import { Cell, Grid, Row } from '@material/react-layout-grid';
import MaterialIcon from '@material/react-material-icon';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

// thunks
import { displaySnackMessage } from '@modules/snack';
import { deleteSingleTrip, getAllUserTrips } from '@modules/trips';
import { Trip } from '@modules/trips/interfaces';

import Loader from '@components/Loader';
import EditSingleTripPage from '@pages/EditSingleTripPage';
import TripsPageForm from '@pages/TripsPageForm';
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

  const [showingNewTripForm, setShowingNewTripForm] = React.useState<Boolean>(false);
  const [showingSingleTrip, setShowingSingleTrip] = React.useState<Boolean>(false);
  const [selectedTripId, setSelectedTripId] = React.useState<string>();
  const [editTrip, setEditTrip] = React.useState<Trip>(undefined);

  React.useEffect(() => {
    switch (state.action) {
      case 'delete':
        props.deleteSingleTrip(state.trip_id);
        break;
      case 'dismiss':
        setState({ ...state, isDeleteModal: false });
        break;
    }
    props.getAllUserTrips()
      .then(() => setState({ ...state, trips: props.trips }))
      .then(() => setState({ ...state, isLoading: false }));
  },              [state.action]);

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
        <DialogButton action="dismiss">Dismiss</DialogButton>
        <DialogButton
          className="mdc-button big-round-corner-button mdc-button--raised"
          action="delete"
          isDefault>
          Delete
        </DialogButton>
      </DialogFooter>
    </Dialog>
  );

  const ActionButtons = trip => (
    <div key={trip.id} className="action-buttons">
      <span onClick={() => setState({ ...state, isEditMode: true })}>
      <MaterialIcon className="action-buttons__edit" role="button" icon="edit" initRipple={null}/>
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

  const blankContent = () => (
    <React.Fragment>
      <div className="blank-content">
        <h4>You don't have any trip scheduled</h4>
        <h5>Tap + to create one</h5>
          <Fab
            onClick={() => setShowingNewTripForm(!showingNewTripForm)}
            className="create-trip-button" icon={<MaterialIcon icon="add" initRipple={null}/>}
          />
      </div>
    </React.Fragment>
  );

  const renderTripsComponent = () => {
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
            <h3 className="user-trips-title">My Recent Trips</h3>
          </Cell>
        </Row>
        <Row>
          {DeleteModal()}
          {(props.trips.length > 0) ?
            props.trips.map((trip) => {
              return (
                <TripCard
                  key={trip.id}
                  trip={trip}
                  isOwner={true}
                  setSelectedTrip={setSelectedTripId}
                  setShowingSingleTrip={setShowingSingleTrip}
                  editTrip={setEditTrip}
                  handleDeleteTrip={() => setState({ ...state, trip_id: trip.id, isDeleteModal: true })}
                />
              );
            }) :
            <Cell
              columns={12}
              desktopColumns={12}
              tabletColumns={8}
              phoneColumns={4}
            >
              {blankContent()}
            </Cell>
          }
        </Row>
        <Row>
          <Cell>
              <Fab
                onClick={() => setShowingNewTripForm(!showingNewTripForm)}
                className="create-trip-button"
                icon={<MaterialIcon icon="add" initRipple={null}/>}
              />
          </Cell>
        </Row>
      </Grid>
    );
  };

  return state.isLoading ? <Loader /> :
    showingNewTripForm
      ?
      <TripsPageForm setShowingNewTripForm={setShowingNewTripForm} />
      : editTrip
      ? <EditSingleTripPage
          setEditTrip={setEditTrip}
          editTripId={selectedTripId}
        /> : renderTripsComponent();
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
