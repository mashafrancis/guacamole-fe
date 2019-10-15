// thunks
import { displaySnackMessage } from 'modules/snack';

// interfaces
import {
  AddTripActionRequest,
  AddTripActionSuccess,
  AddTripsActionFailure,
  DeleteTripActionFailure,
  DeleteTripActionRequest,
  DeleteTripActionSuccess,
  EditTripActionFailure,
  EditTripActionRequest,
  EditTripActionSuccess,
  GetAllTripsActionFailure,
  GetAllTripsActionRequest,
  GetAllTripsActionSuccess,
  GetSingleTripActionFailure,
  GetSingleTripActionRequest,
  GetSingleTripActionSuccess,
  GetUserTripsActionFailure,
  GetUserTripsActionRequest,
  GetUserTripsActionSuccess,
  RequestTripActionFailure,
  RequestTripActionRequest,
  RequestTripActionSuccess,
  Trip,
} from './interfaces';

// types
import {
  ADD_TRIPS_FAILURE,
  ADD_TRIPS_REQUEST,
  ADD_TRIPS_SUCCESS,
  DELETE_TRIP_FAILURE,
  DELETE_TRIP_REQUEST,
  DELETE_TRIP_SUCCESS,
  EDIT_TRIP_FAILURE,
  EDIT_TRIP_REQUEST,
  EDIT_TRIP_SUCCESS,
  GET_SINGLE_TRIP_FAILURE,
  GET_SINGLE_TRIP_REQUEST,
  GET_SINGLE_TRIP_SUCCESS,
  GET_TRIPS_FAILURE,
  GET_TRIPS_REQUEST,
  GET_TRIPS_SUCCESS,
  GET_USER_TRIPS_FAILURE,
  GET_USER_TRIPS_REQUEST,
  GET_USER_TRIPS_SUCCESS,
  REQUEST_TRIP_FAILURE,
  REQUEST_TRIP_REQUEST,
  REQUEST_TRIP_SUCCESS
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

/**
 * Delete single trip request
 *
 * @returns {DeleteTripActionRequest}
 */
export const deleteSingleTripRequest = (): DeleteTripActionRequest => ({
  type: DELETE_TRIP_REQUEST,
});

/**
 * Delete single trip success
 *
 * @returns {DeleteTripActionSuccess}
 * @param id
 */
export const deleteSingleTripSuccess = (id): DeleteTripActionSuccess => ({
  id,
  type: DELETE_TRIP_SUCCESS,
});

/**
 * Delete single trip failure
 *
 * @returns {DeleteTripActionFailure}
 */
export const deleteSingleTripFailure = (errors): DeleteTripActionFailure => ({
  errors,
  type: DELETE_TRIP_FAILURE,
});

/**
 * Edit a trip request
 *
 * @returns {AddTripActionRequest}
 */
export const editTripRequest = (): EditTripActionRequest => ({
  type: EDIT_TRIP_REQUEST,
});

/**
 * Add new trip success
 *
 * @param {Trip} trip
 * @returns {AddTripActionSuccess}
 */
export const editTripSuccess = (trip: Trip): EditTripActionSuccess => ({
  trip,
  type: EDIT_TRIP_SUCCESS,
});

/**
 * Add new trip failure
 *
 * @returns {AddTripsActionFailure}
 */
export const editTripFailure = (errors): EditTripActionFailure => ({
  errors,
  type: EDIT_TRIP_FAILURE,
});

/**
 * Request a trip request
 *
 * @returns {RequestTripActionRequest}
 */
const requestTripRequest = (): RequestTripActionRequest => ({
  type: REQUEST_TRIP_REQUEST,
});

/**
 * Request a trip success
 *
 * @param {tripId} string
 * @returns {RequestTripActionSuccess}
 */
const requestTripSuccess = (): RequestTripActionSuccess => ({
  type: REQUEST_TRIP_SUCCESS,
});

/**
 * Request a trip failure
 *
 * @param {errors} any
 * @returns {RequestTripActionFailure}
 */
const requestTripFailure = (errors: any): RequestTripActionFailure => ({
  errors,
  type: REQUEST_TRIP_FAILURE,
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
  dispatch(getUserTripsRequest());
  return http.get('user_trips', { cache: true })
    .then((response) => {
      const { data: { data } } = response;
      dispatch(getUserTripsSuccess(data));
      return data;
    })
    .catch((errors) => {
      const error = errors.response.data.errors;
      dispatch(displaySnackMessage(`${error}`));
      dispatch(getUserTripsFailure(errors));
    });
};

export const deleteSingleTrip = id => (dispatch, getState, http) => {
  dispatch(deleteSingleTripRequest());
  return http.delete(`trips/${id}`)
    .then((response) => {
      const message = response.data.data.message;
      dispatch(deleteSingleTripSuccess(id));
      dispatch(displaySnackMessage(message, true));
    })
    .catch((errors) => {
      const error = errors.response.message;
      dispatch(deleteSingleTripFailure(errors));
      dispatch(displaySnackMessage(`${error}`));
    });
};

/**
 * Thunk action creator
 * Add a new trips
 *
 * @returns {Function} action type and payload
 */
export const editTrip = trip => (dispatch, getState, http) => {
  dispatch(editTripRequest());
  return http.put('trips', trip)
    .then((response) => {
      dispatch(editTripSuccess(response.data.data));
      dispatch(displaySnackMessage('Your trip had been updated successfully.'));
      window.location.replace('/trips');
    })
    .catch((errors) => {
      dispatch(editTripFailure(errors));
      dispatch(displaySnackMessage('Sorry! Something went wrong. Kindly try again'));
    });
};

/**
 * Thunk action creator
 * Add a new trips
 *
 * @returns {Function} action type and payload
 */
export const requestTrip = tripId => (dispatch, getState, http) => {
  dispatch(requestTripRequest());
  return http.put(`trips/${tripId}/request`)
    .then((response) => {
      dispatch(requestTripSuccess());
      dispatch(displaySnackMessage(response.data.message));
    })
    .catch((error) => {
      dispatch(requestTripFailure(error));
      dispatch(displaySnackMessage('Sorry! Something went wrong. Kindly try again'));
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
        user_trips: action.user_trips,
        errors: null,
        isLoading: false,
      };
    case GET_USER_TRIPS_FAILURE:
      return {
        ...state,
        errors: action.errors,
        isLoading: false,
      };
    case DELETE_TRIP_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case DELETE_TRIP_SUCCESS:
      return {
        ...state,
        trip: action.trip,
        errors: null,
        isLoading: false,
      };
    case DELETE_TRIP_FAILURE:
      return {
        ...state,
        errors: action.errors,
        isLoading: false,
      };
    case EDIT_TRIP_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case EDIT_TRIP_SUCCESS:
      return {
        ...state,
        data: action.data,
        errors: null,
        isLoading: false,
      };
    case EDIT_TRIP_FAILURE:
      return {
        ...state,
        errors: action.errors,
        isLoading: false,
      };
    case REQUEST_TRIP_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case REQUEST_TRIP_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case REQUEST_TRIP_FAILURE:
      return {
        ...state,
        isLoading: false,
        errors: action.errors,
      };
    default:
      return state;
  }
};

export default reducer;
