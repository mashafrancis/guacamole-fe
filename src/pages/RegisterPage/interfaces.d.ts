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
  fields: {
    [key: string]: string | number
  };
  errors: any;
  password?: string;
  email?: string;
  username?: string;
  value?: string;
}
