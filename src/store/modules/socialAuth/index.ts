import { displaySnackMessage } from 'modules/snack';
import {
  SocialAuthActionFailure,
  SocialAuthActionRequest,
  SocialAuthActionSuccess
} from 'modules/socialAuth/interfaces';

import {
  SOCIAL_AUTH_FAILURE,
  SOCIAL_AUTH_REQUEST,
  SOCIAL_AUTH_SUCCESS
} from 'modules/socialAuth/types';

// helpers
import { authService } from 'utils/auth';

/**
 * Social authentication request
 *
 * @returns {RegisterActionRequest}
 */
export const socialAuthRequest = (): SocialAuthActionRequest => ({
  type: SOCIAL_AUTH_REQUEST,
});

/**
 * Social authentication success
 *
 * @returns {RegisterActionSuccess}
 */
export const socialAuthSuccess = (payload): SocialAuthActionSuccess => ({
  payload,
  type: SOCIAL_AUTH_SUCCESS,
});

/**
 * Social authentication fail
 *
 * @returns {RegisterActionFailure}
 */
export const socialAuthFailure = (errors): SocialAuthActionFailure => ({
  errors,
  type: SOCIAL_AUTH_FAILURE,
});

// actions
/**
 * Thunk action creator
 * Social authentication for a user
 *
 * @returns {Function} action type and payload
 * @param payload
 */
export const socialAuthentication = payload => (dispatch, getState, http) => {
  dispatch(socialAuthRequest());
  return http.post('social/login', payload)
    .then((response) => {
      authService.saveToken(response.data.response.data.token);
      dispatch(socialAuthSuccess(response.data.response));
      const message = response.data.response.message;
      dispatch(displaySnackMessage(`${message}`));
      window.location.replace('/');
    })
    .catch((errors) => {
      const error = 'Something went wrong with the authentication. Kindly try again.';
      dispatch(socialAuthFailure(errors));
      dispatch(displaySnackMessage(`${error}`));
    });
};

export const socialAuthenticateState = {
  payload: {},
  errors: {},
  isLoading: false,
};

const reducer = (state = socialAuthenticateState, action) => {
  switch (action.type) {
    case SOCIAL_AUTH_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case SOCIAL_AUTH_SUCCESS:
      return {
        ...state,
        payload: action.payload,
        error: null,
        isLoading: false,
      };
    case SOCIAL_AUTH_FAILURE:
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
