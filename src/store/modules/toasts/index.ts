import { DisplayToastMessageAction } from './interfaces';
import { DISPLAY_TOAST_MESSAGE } from './types';

// action creators

/**
 * Display toast message action creator.
 *
 *
 * @returns {DisplayToastMessageAction}
 * @param message
 * @param type
 * @param withName
 */
export const displayToastMessage = (
  message: string,
  type: string = 'success',
  withName: boolean = false
): DisplayToastMessageAction => ({
  toast: {
    message,
    type,
    withName,
  },
  type: DISPLAY_TOAST_MESSAGE,
});

/**
 * The toasts reducer
 *
 * @param {Object} state
 * @param {DisplayToastMessageAction} action
 */
export const reducer = (
  state = {},
  action: DisplayToastMessageAction
) => {
  switch (action.type) {
    case DISPLAY_TOAST_MESSAGE:
      return action.toast;
    default:
      return state;
  }
};

export default reducer;
