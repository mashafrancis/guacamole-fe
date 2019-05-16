import {
  EDIT_USER_DETAILS_FAILURE,
  EDIT_USER_DETAILS_SUCCESS,
  GET_USER_DETAILS_FAILURE,
  GET_USER_DETAILS_SUCCESS,
 } from './types';

export interface GetUserDetailsActionSuccess {
  userDetails: UserDetails;
  type: GET_USER_DETAILS_SUCCESS;
}

export interface GetUserDetailsActionFailure {
  type: GET_USER_DETAILS_FAILURE;
}

export interface EditUserDetailsSuccess {
  userDetails: UserDetails;
  type: EDIT_USER_DETAILS_SUCCESS;
}

export interface EditUserDetailsFailure {
  type: EDIT_USER_DETAILS_FAILURE;
}

interface UserDetails {
  id?: string;
  name: string;
  picture?: string;
  email: string;
  tokenId: string;
  role?: UserRole;
  permissions?: FormattedPermissions;
  imageUrl?: string;
}
