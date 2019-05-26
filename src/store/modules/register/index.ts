// thunks
import { displaySnackMessage } from 'modules/snack';

// interfaces
import {
  RegisterActionFailure,
  RegisterActionRequest,
  RegisterActionSuccess,
} from './interfaces';

// types
import {
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from './types';

/**
 * Register request
 *
 * @returns {RegisterActionRequest}
 */
export const registerRequest = (): RegisterActionRequest => ({
  type: REGISTER_REQUEST,
});

/**
 * Register user success
 *
 * @returns {RegisterActionSuccess}
 */
export const registerSuccess = (user): RegisterActionSuccess => ({
  type: REGISTER_SUCCESS,
  payload: user,
});

/**
 * Register user fail
 *
 * @returns {RegisterActionFailure}
 */
export const registerFailure = (errors): RegisterActionFailure => ({
  errors,
  type: REGISTER_FAILURE,
});

// actions
/**
 * Thunk action creator
 * Register a new user
 *
 * @returns {Function} action type and payload
 * @param user
 */
export const registerUser = user => (dispatch, getState, http) => {
  dispatch(registerRequest());
  return http.post('users/register', user)
    .then((response) => {
      dispatch(registerSuccess(response.data.response));
      const message = response.data.response.message;
      dispatch(displaySnackMessage(`${message}`));
    })
    .catch((errors) => {
      const error = errors.response.data.errors;
      dispatch(registerFailure(errors));
      Object.entries(error).forEach(([key, value]) => dispatch(displaySnackMessage(`${value}`)));
    });
};

// Set the initial user registration state
export const userRegistrationState = {
  user: {},
  errors: {},
  isLoading: false,
};

/**
 * Reducer for user register
 *
 */
const reducer = (state = userRegistrationState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
        isLoading: false,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        errors: action.errors,
        isLoading: true,
      };
    default:
      return state;
  }
};

export default reducer;
