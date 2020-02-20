export interface ResetPasswordPageProps {
  displaySnackMessage?: (message) => Promise<any>;
  resetPassword: (user, token) => Promise<any>;
  user?: any;
  error?: object;
  location: {
    search: string;
  };
  history: {
    push: (url: string) => void;
  }
}

export interface ResetPasswordPageState {
  isLoading: boolean;
  token: string;
  password: string;
}
