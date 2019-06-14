// thunks
import { displaySnackMessage } from 'modules/snack';

// interfaces
import {
  AddTripActionRequest,
  AddTripActionSuccess,
  AddTripsActionFailure,
  GetAllTripsActionFailure,
  GetAllTripsActionRequest,
  GetAllTripsActionSuccess,
  Trip,
} from './interfaces';

// types
import {
  ADD_TRIPS_FAILURE,
  ADD_TRIPS_REQUEST,
  ADD_TRIPS_SUCCESS,
  GET_TRIPS_FAILURE,
  GET_TRIPS_REQUEST,
  GET_TRIPS_SUCCESS,
} from './types';

/**
 * Get all trips request
 *
 * @returns {GetAllTripsActionRequest}
 */
export const getTripsRequest = (): GetAllTripsActionRequest => ({
  type: GET_TRIPS_REQUEST,
});

/**
 * Get all trips success
 *
 * @param {Trip} trips
 * @returns {GetAllTripsActionSuccess}
 */
export const getTripsSuccess = (trips: Trip[]): GetAllTripsActionSuccess => ({
  trips,
  type: GET_TRIPS_SUCCESS,
});

/**
 * Get all trips failure
 *
 * @returns {GetAllTripsActionSuccess}
 */
export const getTripsFailure = (errors): GetAllTripsActionFailure => ({
  errors,
  type: GET_TRIPS_FAILURE,
});

/**
 * Add a new trip request
 *
 * @returns {AddTripActionRequest}
 */
export const addTripRequest = (): AddTripActionRequest => ({
  type: ADD_TRIPS_REQUEST,
});

/**
 * Add new trip success
 *
 * @param {Trip} trip
 * @returns {AddTripActionSuccess}
 */
export const addTripSuccess = (trip: Trip): AddTripActionSuccess => ({
  trip,
  type: ADD_TRIPS_SUCCESS,
});

/**
 * Get all trips failure
 *
 * @returns {AddTripsActionFailure}
 */
export const addTripFailure = (errors): AddTripsActionFailure => ({
  errors,
  type: ADD_TRIPS_FAILURE,
});

// actions
/**
 * Thunk action creator
 * Get all trips
 *
 * @returns {Function} action type and payload
 */
export const getAllTrips = () => (dispatch, getState, http) => {
  dispatch(getTripsRequest());
  return http.get('trips', { cache: true })
    .then((response) => {
      const { data: { data } } = response;
      dispatch(getTripsSuccess(data));
      return data;
    })
    .catch((errors) => {
      const error = errors.response.data.errors;
      dispatch(displaySnackMessage(`${error}`));
      dispatch(getTripsFailure(errors));
    });
};

/**
 * Thunk action creator
 * Add a new trips
 *
 * @returns {Function} action type and payload
 */
export const addNewtrip = trip => (dispatch, getState, http) => {
  dispatch(addTripRequest());
  return http.post('trips', trip)
    .then((response) => {
      dispatch(addTripSuccess(response.data.data));
      dispatch(displaySnackMessage('Your trip had been added successfully.'));
    })
    .catch((errors) => {
      dispatch(addTripFailure(errors));
      dispatch(displaySnackMessage('Sorry! Something went wrong. Kindly try again'));
    });
};

export const tripsInitialState = {
  data: [],
  isLoading: false,
  errors: {},
};

const reducer = (state = tripsInitialState, action) => {
  switch (action.type) {
    case GET_TRIPS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_TRIPS_SUCCESS:
      return {
        ...state,
        data: action.trips,
        errors: null,
        isLoading: false,
      };
    case GET_TRIPS_FAILURE:
      return {
        ...state,
        errors: action.errors,
        isLoading: false,
      };
    case ADD_TRIPS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case ADD_TRIPS_SUCCESS:
      return {
        ...state,
        data: action.data,
        errors: null,
        isLoading: false,
      };
    case ADD_TRIPS_FAILURE:
      return {
        ...state,
        errors: action.errors,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
