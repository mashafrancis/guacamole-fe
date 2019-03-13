import { combineReducers } from 'redux';

// reducers

// types
// import { LOG_OUT_USER } from 'modules/user/types';

const appReducer = combineReducers({

});

const rootReducer = (state, action) => {
  // switch (action.type) {
  //   case LOG_OUT_USER:
  //     return {
  //       state: undefined,
  //     };
  // }

  return appReducer(state, action);
};

export default rootReducer;
