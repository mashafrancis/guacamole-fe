// third-party libraries
import * as Cookie from 'cookies-js';
import * as Cookies from 'js-cookie';

// helpers
import { authService } from '@utils/auth';
import { token } from '../testHelpers';

describe.skip('AuthService object', () => {
  describe('IsAuthenticated function', () => {
    it('should return true if a user token has not expired', () => {
      Cookies.set('jwt-token', token);

      expect(authService.isAuthenticated()).toBeTruthy();
    });

    it('should return false when a user token has expired', () => {
      Cookie.expire('jwt-token');

      expect(authService.isAuthenticated()).toBeFalsy();
    });
  });

  describe('LogoutUser function', () => {
    it('should call Cookie.expire to make user token expired', () => {
      // @ts-ignore
      Cookie.expire = jest.fn();
      authService.logoutUser();

      expect(Cookie.expire).toHaveBeenCalled();
    });
  });

  describe('RedirectUser function', () => {
    it('should call logoutUser', () => {
      authService.logoutUser = jest.fn();
      authService.redirectUser();

      expect(authService.logoutUser).toHaveBeenCalled();
    });
  });
});
