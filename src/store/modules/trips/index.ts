// thunks
import { displaySnackMessage } from 'modules/snack';

// interfaces
import {
  GetAllTripsActionFailure,
  GetAllTripsActionRequest,
  GetAllTripsActionSuccess,
  Trip,
} from './interfaces';

// types
import {
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
 * Get all trips request
 *
 * @param {Trip} trips
 * @returns {GetAllTripsActionSuccess}
 */
export const getTripsSuccess = (trips: Trip[]): GetAllTripsActionSuccess => ({
  trips,
  type: GET_TRIPS_SUCCESS,
});

/**
 * Get all trips request
 *
 * @returns {GetAllTripsActionSuccess}
 */
export const getTripsFailure = (errors): GetAllTripsActionFailure => ({
  errors,
  type: GET_TRIPS_FAILURE,
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
    default:
      return state;
  }
};

export default reducer;
