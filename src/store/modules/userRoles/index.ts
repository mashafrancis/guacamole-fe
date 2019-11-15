// thunks
import { displaySnackMessage } from '@modules/snack';

// interfaces
import {
  CreateUserRolesActionSuccess,
  UserDeleteRolesSuccess,
  UserEditRolesSuccess,
  UserRolesActionSuccess
} from './interfaces';

// types
import {
  CREATE_USER_ROLES_SUCCESS,
  DELETE_USER_ROLES_SUCCESS,
  EDIT_USER_ROLES_SUCCESS,
  GET_USER_ROLES_SUCCESS
} from './types';

/**
 * action creator
 *
 * Create user roles success action creator
 *
 * @param {UserRole} userRole
 *
 * @returns {CreateUserRolesActionSuccess}
 */

export const createUserRoleSuccess = (userRole): CreateUserRolesActionSuccess => ({
  userRole,
  type: CREATE_USER_ROLES_SUCCESS,
});

/**
 * action creator
 *
 * Get user roles success action creator
 *
 *
 * @returns {UserRolesActionSuccess}
 * @param allRolesAndPermissions
 */
export const getUserRolesSuccess = (allRolesAndPermissions): UserRolesActionSuccess => ({
  userRoles: allRolesAndPermissions.data,
  permissions: allRolesAndPermissions.permissions,
  resources: allRolesAndPermissions.resources,
  type: GET_USER_ROLES_SUCCESS,
});

/**
 * action creator
 *
 * Delete user roles success action creator
 *
 *
 * @returns {UserDeleteRolesSuccess}
 * @param userRoleId
 */
export const deleteUserRolesSuccess = (userRoleId: string): UserDeleteRolesSuccess => ({
  userRoleId, type: DELETE_USER_ROLES_SUCCESS,
});

/**
 * action creator
 *
 * Update user roles success action creator
 *
 * @param {UserRole[], string} userRole
 *
 * @param userRoleId
 * @returns {UserEditRolesSuccess}
 */
export const editUserRoleSuccess = (userRole, userRoleId: string): UserEditRolesSuccess => ({
  userRole,
  userRoleId,
  type: EDIT_USER_ROLES_SUCCESS,
});

/**
 * Thunk
 *
 * Create user role thunk
 *
 * @param {Object} userRole
 *
 * @returns {Function}
 */
export const createUserRole = userRole => (dispatch, getState, http) => {
  return http.post(`/roles`, userRole)
    .then((response) => {
      dispatch(createUserRoleSuccess(response.data.data));
      return dispatch(displaySnackMessage('User Role successfully created'));
    })
    .catch(error =>
      dispatch(displaySnackMessage(error.response.data.message))
    );
};

/**
 * Thunk
 *
 * Delete user roles thunk
 *
 * @param {string} userRoleId
 *
 * @returns {Function}
 */
export const deleteUserRole = userRoleId => (dispatch, getState, http) => {
  return http.delete(`/roles/${userRoleId}`)
    .then(() => {
      dispatch(deleteUserRolesSuccess(userRoleId));
      dispatch(displaySnackMessage('Role has been deleted successfully'));
    })
    .catch((error) => {
      dispatch(displaySnackMessage(error.response.data.message));
    });
};

/**
 * Thunk
 *
 * Get user roles thunk
 *
 * @returns {Function}
 */
export const getUserRoles = () => (dispatch, getState, http) => {
  return http.get('/roles?include=permissions&include=resources', { cache: true })
    .then(response => dispatch(getUserRolesSuccess(response.data)))
    .catch(error => dispatch(displaySnackMessage(error.message)));
};

/**
 * Thunk
 *
 * Edit a user role thunk
 *
 * @param {Object} updatedRolePayload
 *
 * @returns {Function}
 */
export const editUserRole = updatedRolePayload => (dispatch, getState, http) => {
  const { id } = updatedRolePayload;
  return http.patch(`/roles/${id}`, updatedRolePayload)
    .then((response) => {
      dispatch(editUserRoleSuccess(response.data.data, id));
      dispatch(displaySnackMessage('Role updated successfully'));
    })
    .catch((error) => {
      if (error.response.status === 400) {
        dispatch(displaySnackMessage('Please format the fields properly'));
      } else {
        dispatch(displaySnackMessage(error.response.data.message));
      }
    });
};

// Set the initial role state
const userRoleInitialState = {
  data: [],
};

/**
 * Redux reducer for User Role actions
 *
 * This reducer changes the userRole state of the application
 *
 * @param {UserRoleState} state Reducer initial state
 * @param {Action} action
 *
 * @returns {UserRoleState} new state
 */
const reducer = (state = userRoleInitialState, action) => {
  switch (action.type) {
    case GET_USER_ROLES_SUCCESS:
      return {
        ...state,
        data: action.userRoles,
        resources: action.resources,
        permissions: action.permissions,
      };
    case DELETE_USER_ROLES_SUCCESS:
      return {
        ...state,
        data: [...state.data].filter(userRole => action.userRoleId !== userRole.id),
      };
    case EDIT_USER_ROLES_SUCCESS:
      return {
        ...state,
        data: [...state.data].map(role => role.id === action.userRole.id ? ({
          ...role,
          ...action.userRole,
        }) : role),
      };
    case CREATE_USER_ROLES_SUCCESS:
      return {
        ...state,
        data: [action.userRole, ...state.data],
      };
    default:
      return state;
  }
};

export default reducer;
