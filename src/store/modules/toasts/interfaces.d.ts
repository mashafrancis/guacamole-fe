import { DISPLAY_TOAST_MESSAGE } from 'modules/toasts/types';

export interface DisplayToastMessageAction {
  type: DISPLAY_TOAST_MESSAGE;
  toast: ToastMessage;
}

export interface ToastMessage {
  message: string;
  type: string;
  withName: boolean;
}
