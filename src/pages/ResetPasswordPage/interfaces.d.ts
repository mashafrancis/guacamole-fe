export interface ResetPasswordPageProps {
  displaySnackMessage?: (message) => Promise<any>;
  forgotPassword: (user) => Promise<any>;
  error?: object;
  location: {
    search: string;
  };
}

export interface ResetPasswordPageState {
  isLoading: boolean;
  isValid: boolean;
  focused: boolean;
  fields: {
    [key: string]: string | number
  };
  errors: {
    [key: string]: string
  };
}
