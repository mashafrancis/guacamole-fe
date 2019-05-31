export interface RegisterPageProps {
  registerUser: (user) => Promise<any>;
  displaySnackMessage?: (message) => Promise<any>;
  error?: object;
}

export interface RegisterPageState {
  isLoading: boolean;
  isValid: boolean;
  focused: boolean;
  isPasswordHidden: boolean;
  fields: {
    [key: string]: string | number
  };
  errors: {
    [key: string]: string
  };
}
