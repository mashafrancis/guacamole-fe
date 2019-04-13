// thunks
import { displaySnackMessage } from '.';

// helper functions
import { reduxMockStore } from '../../../testHelpers';

// types
import { DISPLAY_SNACK_MESSAGE } from './types';

describe('The snack action', () => {
  const toastMessageInitialState = {};

  it('should display a snack message', () => {
    const toastMessage = 'Welcome to Activo the smart Asset management solution';
    const expectedAction = {
      toast: {
        message: toastMessage,
        withName: false,
      },
      type: DISPLAY_SNACK_MESSAGE,
    };
    const store = reduxMockStore({}, toastMessageInitialState);

    store.dispatch(displaySnackMessage(toastMessage));
    expect(store.getActions()[0]).toEqual(expectedAction);
  });
});
