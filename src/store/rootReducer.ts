import { combineReducers } from 'redux';

// reducers
import authentication from 'modules/authentication';
import internalServerError from 'modules/internalServerError';
import snack from 'modules/snack';
import user from 'modules/user';
import userRoles from 'modules/userRoles';

// types
import { LOG_OUT_USER } from 'modules/user/types';

const appReducer = combineReducers({
  internalServerError,
  snack,
  authentication,
  user,
  userRoles,
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
