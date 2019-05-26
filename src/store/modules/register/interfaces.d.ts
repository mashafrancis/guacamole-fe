// types
import {
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from './types';

export interface RegisterActionRequest {
  type: REGISTER_REQUEST;
}

export interface RegisterActionSuccess {
  type: REGISTER_SUCCESS;
  payload: User;
}

export interface RegisterActionFailure {
  type: REGISTER_FAILURE;
  errors: any;
}

export default interface User {
  username?: string;
  email: string;
  password?: string;
}
