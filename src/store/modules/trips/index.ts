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
  GetSingleTripActionFailure,
  GetSingleTripActionRequest,
  GetSingleTripActionSuccess,
  GetUserTripsActionFailure,
  GetUserTripsActionRequest,
  GetUserTripsActionSuccess,
  Trip,
} from './interfaces';

// types
import {
  ADD_TRIPS_FAILURE,
  ADD_TRIPS_REQUEST,
  ADD_TRIPS_SUCCESS,
  GET_SINGLE_TRIP_FAILURE,
  GET_SINGLE_TRIP_REQUEST,
  GET_SINGLE_TRIP_SUCCESS,
  GET_TRIPS_FAILURE,
  GET_TRIPS_REQUEST,
  GET_TRIPS_SUCCESS,
  GET_USER_TRIPS_FAILURE,
  GET_USER_TRIPS_REQUEST,
  GET_USER_TRIPS_SUCCESS,
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
 * Add new trip failure
 *
 * @returns {AddTripsActionFailure}
 */
export const addTripFailure = (errors): AddTripsActionFailure => ({
  errors,
  type: ADD_TRIPS_FAILURE,
});

/**
 * Get single trip request
 *
 * @returns {GetAllTripsActionRequest}
 */
export const getSingleTripRequest = (): GetSingleTripActionRequest => ({
  type: GET_SINGLE_TRIP_REQUEST,
});

/**
 * Get single trip success
 *
 * @param {Trip} trip
 * @returns {GetSingleTripActionSuccess}
 */
export const getSingleTripSuccess = (trip: Trip): GetSingleTripActionSuccess => ({
  trip,
  type: GET_SINGLE_TRIP_SUCCESS,
});

/**
 * Get single trip failure
 *
 * @returns {GetAllTripsActionSuccess}
 */
export const getSingleTripFailure = (errors): GetSingleTripActionFailure => ({
  errors,
  type: GET_SINGLE_TRIP_FAILURE,
});

/**
 * Get all user trips request
 *
 * @returns {GetAllTripsActionRequest}
 */
export const getUserTripsRequest = (): GetUserTripsActionRequest => ({
  type: GET_USER_TRIPS_REQUEST,
});

/**
 * Get all user trips success
 *
 * @returns {GetUserTripsActionSuccess}
 * @param user_trips
 */
export const getUserTripsSuccess = (user_trips: Trip[]): GetUserTripsActionSuccess => ({
  user_trips,
  type: GET_USER_TRIPS_SUCCESS,
});

/**
 * Get all user trips failure
 *
 * @returns {GetUserTripsActionFailure}
 */
export const getUserTripsFailure = (errors): GetUserTripsActionFailure => ({
  errors,
  type: GET_USER_TRIPS_FAILURE,
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
export const addNewTrip = trip => (dispatch, getState, http) => {
  dispatch(addTripRequest());
  return http.post('trips', trip)
    .then((response) => {
      dispatch(addTripSuccess(response.data.data));
      dispatch(displaySnackMessage('Your trip had been added successfully.'));
      window.location.replace('/trips');
    })
    .catch((errors) => {
      dispatch(addTripFailure(errors));
      dispatch(displaySnackMessage('Sorry! Something went wrong. Kindly try again'));
    });
};

/**
 * Thunk action creator
 * Get a single trip
 *
 * @returns {Function} action type and payload
 */
export const getSingleTrip = tripId => (dispatch, getState, http) => {
  dispatch(getSingleTripRequest());
  return http.get(`trips/${tripId}`, { cache: true })
    .then((response) => {
      return dispatch(getSingleTripSuccess(response.data.data));
    })
    .catch((errors) => {
      const error = 'Error!';
      dispatch(displaySnackMessage(`${error}`));
      dispatch(getSingleTripFailure(errors));
    });
};

// actions
/**
 * Thunk action creator
 * Get all trips
 *
 * @returns {Function} action type and payload
 */
export const getAllUserTrips = () => (dispatch, getState, http) => {
  dispatch(getTripsRequest());
  return http.get('user_trips', { cache: true })
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

export const tripsInitialState = {
  data: [],
  user_trips: [],
  trip: {},
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
    case GET_SINGLE_TRIP_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_SINGLE_TRIP_SUCCESS:
      return {
        ...state,
        trip: action.trip,
        errors: null,
        isLoading: false,
      };
    case GET_SINGLE_TRIP_FAILURE:
      return {
        ...state,
        errors: action.errors,
        isLoading: false,
      };
    case GET_USER_TRIPS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_USER_TRIPS_SUCCESS:
      return {
        ...state,
        user_trips: action.trips,
        errors: null,
        isLoading: false,
      };
    case GET_USER_TRIPS_FAILURE:
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
