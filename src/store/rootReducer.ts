import { combineReducers } from 'redux';

// reducers
import internalServerError from 'modules/internalServerError';
import login from 'modules/login';
import passwordReset from 'modules/passwordReset';
import register from 'modules/register';
import snack from 'modules/snack';
import socialAuth from 'modules/socialAuth';
import user from 'modules/user';
import userRoles from 'modules/userRoles';

// types
import { LOG_OUT_USER } from 'modules/user/types';

const appReducer = combineReducers({
  internalServerError,
  snack,
  register,
  login,
  user,
  userRoles,
  passwordReset,
  socialAuth,
});

const rootReducer = (state, action) => {
  switch (action.type) {
    case LOG_OUT_USER:
      return {
        state: undefined,
      };
  }

  return appReducer(state, action);
};

export default rootReducer;
