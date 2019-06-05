// thunks
import { displaySnackMessage } from 'modules/snack';

// interfaces
import {
  ForgotPasswordActionFailure,
  ForgotPasswordActionRequest,
  ForgotPasswordActionSuccess,
  ResetPasswordActionFailure,
  ResetPasswordActionRequest,
  ResetPasswordActionSuccess,
} from './interfaces';

// types
import {
  FORGOT_PASSWORD_FAILURE,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
} from './types';

/**
 * Reset password request
 *
 * @returns { ResetPasswordActionRequest }
 */
export const resetPasswordRequest = (): ResetPasswordActionRequest => ({
  type: RESET_PASSWORD_REQUEST,
});

/**
 * Reset password request
 *
 * @returns { ResetPasswordActionRequest }
 */
export const resetPasswordSuccess = (user): ResetPasswordActionSuccess => ({
  type: RESET_PASSWORD_SUCCESS,
  payload: user,
});

/**
 * Reset password request
 *
 * @returns { ResetPasswordActionRequest }
 */
export const resetPasswordFailure = (errors): ResetPasswordActionFailure => ({
  errors,
  type: RESET_PASSWORD_FAILURE,
});

/**
 * Forgot password request
 *
 * @returns { ForgotPasswordActionRequest }
 */
export const forgotPasswordRequest = (): ForgotPasswordActionRequest => ({
  type: FORGOT_PASSWORD_REQUEST,
});

/**
 * Forgot password request
 *
 * @returns { ForgotPasswordActionSuccess }
 */
export const  forgotPasswordSuccess = (user): ForgotPasswordActionSuccess => ({
  type: FORGOT_PASSWORD_SUCCESS,
  payload: user,
});

/**
 * Forgot password request
 *
 * @returns { ForgotPasswordActionFailure }
 */
export const forgotPasswordFailure = (errors): ForgotPasswordActionFailure => ({
  errors,
  type: FORGOT_PASSWORD_FAILURE,
});

export const forgotPassword = user => (dispatch, getState, http) => {
  dispatch(forgotPasswordRequest());
  return http.post('users/forgot_password', user)
    .then((response) => {
      dispatch(forgotPasswordSuccess(response.data.response));
      const message = `${response.data.response.success}`;
      dispatch(displaySnackMessage(`${message}`));
    })
    .catch((errors) => {
      const errorMessage = `${errors.response.error}`;
      dispatch(forgotPasswordFailure(errors));
      dispatch(displaySnackMessage(`${errorMessage}`));
    });
};

export const resetPassword = (user, token) => (dispatch, getState, http) => {
  dispatch(resetPasswordRequest());
  return http.put(`users/reset_password/${token}`, user)
    .then((response) => {
      dispatch(resetPasswordSuccess(response.data.response));
      const message = `${response.data.success}`;
      dispatch(displaySnackMessage(`${message}`));
      window.location.replace('/profile');
    })
    .catch((errors) => {
      const errorMessage = `${errors.response.error}`;
      dispatch(resetPasswordFailure(errors));
      dispatch(displaySnackMessage(`${errorMessage}`));
    });
};

// Set the initial user registration state
export const passwordResetState = {
  user: {},
  errors: {},
  isLoading: false,
};

/**
 * Reducer for resetting password
 *
 */
const reducer = (state = passwordResetState, action) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
        isLoading: false,
      };
    case RESET_PASSWORD_FAILURE:
      return {
        ...state,
        errors: action.errors,
        isLoading: true,
      };
    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
        isLoading: false,
      };
    case FORGOT_PASSWORD_FAILURE:
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
