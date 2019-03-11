// interface
import { InternalServerErrorMessageAction } from './interface';

// types
import { INTERNAL_SERVER_ERROR_MESSAGE } from './types';

/**
 * internal server error message action creator.
 *
 * @param {internalServerErrorMessage}
 *
 * @returns {InternalServerErrorMessageAction}
 */
export const displayInternalServerErrorMessage = (
error = true
): InternalServerErrorMessageAction => ({
  error,
  type: INTERNAL_SERVER_ERROR_MESSAGE,
});

/**
 * The internalServerErrorMessage reducer
 *
 * @param {Object} state
 * @param {InternalServerErrorMessageAction} action
 *
 * @returns {object}
 */
export const reducer = (
  state = {
    error: false,
  },
  action: InternalServerErrorMessageAction
) => {
  switch (action.type) {
    case INTERNAL_SERVER_ERROR_MESSAGE:
      const { error } = action;
      return { error };
    default:
      return state;
  }
};

export default reducer;
