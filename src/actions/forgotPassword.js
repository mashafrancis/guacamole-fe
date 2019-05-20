import axios from 'axios';

export const FORGOT_SUCCESS = 'Reset request success';

 export const forgotSuccess = message => ({
  type: FORGOT_SUCCESS,
  message,
});

 export const FORGOT_PROCESSING = 'Reset Processing';
export const forgotProcessing = processing => ({
  type: FORGOT_PROCESSING,
  processing,
});
export const FORGOT_FAILED = 'Reset request Failed';
export const forgotFailed = reason => ({
  type: FORGOT_FAILED,
  reason,
});