// thunks
import { displayToastMessage, reducer } from '.';

describe('The Toast Reducer', () => {
  const toastMessageDefaultState = {};
  const toastMessage = 'Trip created successfully';

  it('should return initial state', () => {
    expect(reducer(undefined, {} as any)).toEqual(toastMessageDefaultState);
  });

  it('should handle DISPLAY_TOAST_MESSAGE', () => {
    const displayToastMessageAction = displayToastMessage(toastMessage);
    const newToastMessageState = reducer(toastMessageDefaultState, displayToastMessageAction) as any;

    expect(newToastMessageState.message).toEqual('Trip created successfully');
  });
});
