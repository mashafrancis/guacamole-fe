import { Permissions, Resources } from 'pages/UserRolesPage/interfaces';
import {
  CREATE_USER_ROLES_SUCCESS,
  DELETE_USER_ROLES_SUCCESS,
  EDIT_USER_ROLES_SUCCESS,
  GET_USER_ROLES_SUCCESS,
} from './types';

export interface UserRolesActionSuccess {
  userRoles: UserRole[];
  permissions?: Permissions;
  resources?: Resources;
  type: GET_USER_ROLES_SUCCESS;
}

export interface CreateUserRolesActionSuccess {
  type: CREATE_USER_ROLES_SUCCESS;
  userRole: UserRole;
}

export interface UserDeleteRolesSuccess {
  userRoleId: string;
  type: DELETE_USER_ROLES_SUCCESS;
}

export interface UserEditRolesSuccess {
  userRoleId: String;
  userRole: UserRole;
  type: EDIT_USER_ROLES_SUCCESS;
}

export interface Resource {
  id: string;
  name: string;
}

export interface Permission {
  id: string;
  type: string;
}

export interface ResourceAccessLevel {
  permissions?: Permission[];
  resource?: Resource;
  [key: string]: any;
}

export interface UserRole {
  description: string;
  users?: Number;
  title: string;
  id: string;
  resourceAccessLevels?: ResourceAccessLevel[];
}
