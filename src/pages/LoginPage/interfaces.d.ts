export interface LoginPageProps {
  loginUser: (user) => Promise<any>;
  displaySnackMessage?: (message) => Promise<any>;
  error?: object;
  location: {
    search: string;
  };
}

export interface LoginPageState {
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
  password: string;
  email: string;
}
