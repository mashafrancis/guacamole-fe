import User from '../register/interfaces';

// types
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
} from './types';

export interface LoginActionRequest {
  type: LOGIN_REQUEST;
}

export interface LoginActionSuccess {
  type: LOGIN_SUCCESS;
  payload: User;
}

export interface LoginActionFailure {
  type: LOGIN_FAILURE;
  errors: any;
}
