// types
import {
  Forgot_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
} from './types';

// types
import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
} from './types';


export interface ResetPasswordActionRequest {
  type: RESET_PASSWORD_REQUEST;
}

export interface ResetPasswordActionSuccess {
  type: RESET_PASSWORD_SUCCESS;
  payload: User;
}

export interface ResetPasswordActionFailure {
  type: RESET_PASSWORD_FAILURE;
  errors: any;
}

export interface ForgotPasswordActionRequest {
  type: FORGOT_PASSWORD_REQUEST;
}

export interface ForgotPasswordActionSuccess {
  type: FORGOT_PASSWORD_SUCCESS;
  payload: User
}

export interface ForgotPasswordActionFailure {
  type: FORGOT_PASSWORD_FAILURE;
  errors: any;
}

export interface User {
  email: string;
}
