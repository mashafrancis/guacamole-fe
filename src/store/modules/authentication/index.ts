// thunks
import { displaySnackMessage } from 'modules/snack';

// interfaces
import {
  LoginActionFailure,
  LoginActionRequest,
  LoginActionSuccess,
  RegisterActionFailure,
  RegisterActionRequest,
  RegisterActionSuccess,
} from './interfaces';

// types
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from './types';

// helpers
import { authService } from 'utils/auth';

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

/**
 * Login request
 *
 * @returns {LoginActionRequest}
 */
export const loginRequest = (): LoginActionRequest => ({
  type: LOGIN_REQUEST,
});

/**
 * Login user success
 *
 * @returns {LoginActionSuccess}
 */
export const loginSuccess = (user): LoginActionSuccess => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

/**
 * Login user fail
 *
 * @returns {LoginActionFailure}
 */
export const loginFailure = (errors): LoginActionFailure => ({
  errors,
  type: LOGIN_FAILURE,
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

/**
 * Thunk action creator
 * Login a user
 *
 * @returns {Function} action type and payload
 * @param user
 */
export const loginUser = user => (dispatch, getState, http) => {
  dispatch(loginRequest());
  return http.post('users/login', user)
    .then((response) => {
      authService.saveToken(response.data.response.token);
      dispatch(loginSuccess(response.data.response));
      const message = `${response.data.response.username} logged in successfully`;
      dispatch(displaySnackMessage(`${message}`));
    })
    .catch((errors) => {
      const errorMessage = errors.response.data.errors.error[0];
      dispatch(loginFailure(errors));
      dispatch(displaySnackMessage(`${errorMessage}`));
    });
};

// Set the initial user registration state
export const userRegistrationState = {
  user: {},
  errors: {},
  isLoading: false,
};

/**
 * Reducer for user authentication
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
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
        isLoading: false,
      };
    case LOGIN_FAILURE:
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
