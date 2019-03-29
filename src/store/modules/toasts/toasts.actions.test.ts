// thunks
import { displayToastMessage } from '.';

// helper functions
import { reduxMockStore } from '../../../testHelpers';

// types
import { DISPLAY_TOAST_MESSAGE } from './types';

describe('The toast action', () => {
  const toastMessageInitialState = {};

  it('should display a toast message', () => {
    const toastMessage = 'Welcome to Activo the smart Asset management solution';
    const expectedAction = {
      toast: {
        message: toastMessage,
        type: 'success',
        withName: false,
      },
      type: DISPLAY_TOAST_MESSAGE,
    };
    const store = reduxMockStore({}, toastMessageInitialState);

    store.dispatch(displayToastMessage(toastMessage));
    expect(store.getActions()[0]).toEqual(expectedAction);
  });
});
