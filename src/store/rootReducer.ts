import { combineReducers } from 'redux';

// reducers
import authentication from 'modules/authentication';
import internalServerError from 'modules/internalServerError';
import snack from 'modules/snack';

// types
// import { LOG_OUT_USER } from 'modules/user/types';

const appReducer = combineReducers({
  internalServerError,
  snack,
  authentication,
});

const rootReducer = (state, action) => {
  switch (action.type) {
    // case LOG_OUT_USER:
    //   return {
    //     state: undefined,
    //   };
  }

  return appReducer(state, action);
};

export default rootReducer;
