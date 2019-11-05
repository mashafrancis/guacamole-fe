// thunks
import { createUserRole, deleteUserRole, editUserRole, getUserRoles } from '.';

// helper functions
import { axiosMock, dispatchMethodMock, reduxMockStore } from '../../../testHelpers';

// types
import { DISPLAY_SNACK_MESSAGE } from '@modules/snack/types';
import {
  CREATE_USER_ROLES_SUCCESS,
  DELETE_USER_ROLES_SUCCESS,
  EDIT_USER_ROLES_SUCCESS,
  GET_USER_ROLES_SUCCESS,
} from './types';

// fixtures
import { userRoles } from './fixtures';

describe('User roles action', () => {
  const userRoleInitialState = {
    data: [],
  };

  const userRoleTestData = {
    title: 'operation Intern Assistant Manager',
    description: 'reports to the operations director',
    resourceAccessLevel: [
      {
        resourceId: '-LNjbkWK5BslZcJaiQbz',
        permissionIds: [],
      },
    ],
  };

  describe('Get user roles thunk', () => {
    it('should get the user roles', () => {
      const expectedAction = [
        {
          userRoles: { userRoles },
          type: GET_USER_ROLES_SUCCESS,
        },
      ];
      const userRolesResponse = {
        data: {
          data: {
            userRoles,
          },
        },
      };
      const http = axiosMock('/roles', userRolesResponse);
      const store = reduxMockStore(http, userRoleInitialState);

      return dispatchMethodMock(store, getUserRoles(), expectedAction);
    });

    it('should return an error message when it failed to get the user roles', () => {
      const mockErrorResponse = {
        message: 'Error occured when deleting this user role.',
      };
      const expectedAction = [
        {
          snack: {
            message: mockErrorResponse.message,
            withName: false,
          },
          type: DISPLAY_SNACK_MESSAGE,
        },
      ];
      const http = axiosMock('/roles?include=permissions&include=resources', mockErrorResponse, false);
      const store = reduxMockStore(http, userRoleInitialState);

      return dispatchMethodMock(store, getUserRoles(), expectedAction);
    });
  });

  describe('Delete user role thunk', () => {
    it('should delete the user roles', () => {
      const userRoleInitialState = {
        data: userRoles,
      };
      const expectedActions = [
        {
          userRoleId: 2,
          type: DELETE_USER_ROLES_SUCCESS,
        },
        {
          snack: {
            message: 'Role has been deleted successfully',
            withName: false,
          },
          type: DISPLAY_SNACK_MESSAGE,
        },
      ];
      const http = axiosMock('/roles', 'Role has been deleted successfully');
      const store = reduxMockStore(http, userRoleInitialState);

      return dispatchMethodMock(store, deleteUserRole(2), expectedActions);
    });

    it('should return an error message when it failed to delete a user role', () => {
      const userRoleInitialState = {
        data: userRoles,
      };
      const mockErrorResponse = {
        response: {
          data: {
            message: 'Error occured when deleting this user role.',
          },
        },
      };
      const expectedAction = [
        {
          snack: {
            message: mockErrorResponse.response.data.message,
            withName: false,
          },
          type: DISPLAY_SNACK_MESSAGE,
        },
      ];
      const http = axiosMock('/roles', mockErrorResponse, false);
      const store = reduxMockStore(http, userRoleInitialState);

      return dispatchMethodMock(store, deleteUserRole(2), expectedAction);
    });
  });

  describe('Edit user role thunk', () => {
    const userRoleInitialState = {
      data: userRoles,
    };
    const updatedUserRole = {
      data: {
        data: {
          title: 'Operations manager',
          description: 'Manage the local center operations',
          id: '-LKfqnzkottT7UdmbHKw',
        },
      },
    };

    it('should edit a user role', () => {
      const expectedActions = [
        {
          userRole: updatedUserRole.data.data,
          userRoleId: '-LKfqnzkottT7UdmbHKw',
          type: EDIT_USER_ROLES_SUCCESS,
        },
        {
          snack: {
            message: 'Role updated successfully',
            withName: false,
          },
          type: DISPLAY_SNACK_MESSAGE,
        },
      ];
      const http = axiosMock('/roles/-LKfqnzkottT7UdmbHKw', updatedUserRole);
      const store = reduxMockStore(http, userRoleInitialState);

      return dispatchMethodMock(store, editUserRole(updatedUserRole.data.data), expectedActions);
    });

    it('should return an error message when user role fields are not properly formatted', () => {
      const mockErrorResponse = {
        response: {
          data: {
            message: 'Please format the fields properly',
          },
          status: 400,
        },
      };
      const expectedAction = [
        {
          snack: {
            message: mockErrorResponse.response.data.message,
            withName: false,
          },
          type: DISPLAY_SNACK_MESSAGE,
        },
      ];
      const http = axiosMock('/roles/-LKfqnzkottT7UdmbHKw', mockErrorResponse, false);
      const store = reduxMockStore(http, userRoleInitialState);

      return dispatchMethodMock(store, editUserRole(updatedUserRole.data.data), expectedAction);
    });

    it('should return an error message when it failed to edit a user role', () => {
      const mockErrorResponse = {
        response: {
          data: {
            message: 'Error occured when editing this user role.',
          },
        },
      };
      const expectedAction = [
        {
          snack: {
            message: mockErrorResponse.response.data.message,
            withName: false,
          },
          type: DISPLAY_SNACK_MESSAGE,
        },
      ];
      const http = axiosMock('/roles/-LKfqnzkottT7UdmbHKw', mockErrorResponse, false);
      const store = reduxMockStore(http, userRoleInitialState);

      return dispatchMethodMock(store, editUserRole(updatedUserRole.data.data), expectedAction);
    });
  });

  describe('Create user role thunk', () => {
    it('should create a new user role', () => {
      const userRoleResponse = {
        data: {
          status: 'success',
          message: 'User Role successfully created',
          data: {
            title: 'operation Intern Assistant Manager',
            description: 'reports to the operations director',
            resourceAccessLevel: [
              {
                resourceId: '-LNjbkWK5BslZcJaiQbz',
                permissionIds: [],
              },
            ],
          },
        },
      };
      const expectedActions = [{
        userRole: userRoleTestData,
        type: CREATE_USER_ROLES_SUCCESS,
      }, {
        snack: {
          message: userRoleResponse.data.message,
          withName: false,
        },
        type: DISPLAY_SNACK_MESSAGE,
      }];
      const http = axiosMock('/roles', userRoleResponse);
      const store = reduxMockStore(http, userRoleInitialState);

      return dispatchMethodMock(store, createUserRole(userRoleTestData), expectedActions);
    });

    it('should return error message when create a new user role fails', () => {
      const mockErrorResponse = {
        response: {
          data: {
            message: 'An error occurred',
          },
        },
      };

      const expectedActions = [
        {
          snack: {
            message: mockErrorResponse.response.data.message,
            withName: false,
          },
          type: DISPLAY_SNACK_MESSAGE,
        },
      ];

      const http = axiosMock('/roles', mockErrorResponse, false);
      const store = reduxMockStore(http, userRoleInitialState);

      return dispatchMethodMock(store, createUserRole(userRoleTestData), expectedActions);
    });
  });
});
