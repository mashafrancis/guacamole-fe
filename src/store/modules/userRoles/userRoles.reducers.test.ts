// thunks
import reducer,
{
  createUserRoleSuccess,
  deleteUserRolesSuccess,
  editUserRoleSuccess,
  getUserRolesSuccess,
} from '.';

// fixtures
import { newUserRole, userRoleResourcePermission } from './fixtures';

describe('UserRoles reducer', () => {
  const userRoleInitialState = {
    data: [],
  };

  it('returns the initial state', () => {
    expect(reducer(undefined, {})).toEqual(userRoleInitialState);
  });

  it('should handle GET_USER_ROLES_SUCCESS', () => {
    const getUserRolesSuccessAction = getUserRolesSuccess(userRoleResourcePermission);
    const newUserRolesState = reducer(userRoleInitialState, getUserRolesSuccessAction);

    expect(newUserRolesState.data[0].title).toEqual('People Coordinator');
    expect(newUserRolesState.data.length).toBe(3);
  });

  it('should handle DELETE_USER_ROLES_SUCCESS', () => {
    const userRoleInitialState = {
      data: userRoleResourcePermission.data,
    };
    const deleteUserRolesSuccessAction = deleteUserRolesSuccess('-LPQEUQL0-SsOtBVWIqV');
    const newUserRolesState = reducer(userRoleInitialState, deleteUserRolesSuccessAction);

    expect(newUserRolesState.data.length).toBe(2);
  });

  it('should handle EDIT_USER_ROLES_SUCCESS', () => {
    const userRoleInitialState = {
      data: userRoleResourcePermission.data,
    };
    const userRoleToUpdate = {
      description: 'Manage the lifecyle of Andelans',
      title: 'People Coordinator',
      id: '-LPQEUQL0-SsOtBVWIqV',
    };
    const editUserRoleSuccessAction = editUserRoleSuccess(userRoleToUpdate, userRoleToUpdate.id);
    const newUserRolesState = reducer(userRoleInitialState, editUserRoleSuccessAction);
    const updatedUserRole = newUserRolesState.data.find(userRole => userRole.id === userRoleToUpdate.id);

    expect(updatedUserRole.title).toEqual('People Coordinator');
  });

  it.skip('should handle CREATE_USER_ROLES_SUCCESS ', () => {
    const createUserRoleAction = createUserRoleSuccess(newUserRole as any);
    const newUserRoleState = reducer(userRoleInitialState, createUserRoleAction);

    expect(newUserRoleState.data[0].description).toBe('reports to the operations director');
  });
});
