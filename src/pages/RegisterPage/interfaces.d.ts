export interface RegisterPageProps {
  registerUser: (user) => Promise<any>;
  displaySnackMessage?: (message) => Promise<any>;
  error?: object;
  history: {
    push: (url: string) => void;
  }
}

export interface RegisterPageState {
  isLoading: boolean;
  isValid: boolean;
  focused: boolean;
  isPasswordHidden: boolean;
  isConfirmPasswordHidden: boolean;
  fields: {
    [key: string]: string | number
  };
  errors: {
    [key: string]: string
  };
}
