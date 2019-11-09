export interface ForgotPasswordPageProps {
  displaySnackMessage?: (message) => Promise<any>;
  forgotPassword: (user) => Promise<any>;
  error?: object;
  location: {
    search: string;
  };
  history: {
    push: (url: string) => void;
  }
}

export interface ForgotPasswordPageState {
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
