// thunks
import { displaySnackMessage } from 'modules/snack';

// interfaces
import {
  LoginActionFailure,
  LoginActionRequest,
  LoginActionSuccess,
} from './interfaces';

// types
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
} from './types';

// helpers
import { authService } from 'utils/auth';

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
      authService.saveToken(response.data.response.data.token);
      dispatch(loginSuccess(response.data.response));
      const message = `${response.data.response.data.username} logged in successfully`;
      dispatch(displaySnackMessage(`${message}`));
      window.location.replace('/explore');
    })
    .catch((errors) => {
      const errorMessage = errors.response.data.errors.error[0];
      dispatch(loginFailure(errors));
      dispatch(displaySnackMessage(`${errorMessage}`));
    });
};

// Set the initial user registration state
export const userLoginState = {
  user: {},
  errors: {},
  isLoading: false,
};

/**
 * Reducer for user register
 *
 */
const reducer = (state = userLoginState, action) => {
  switch (action.type) {
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
        isLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
