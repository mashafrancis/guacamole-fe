export interface ResetPasswordPageProps {
  displaySnackMessage?: (message) => Promise<any>;
  resetPassword: (user, token) => Promise<any>;
  user?: any;
  error?: object;
  location: {
    search: string;
  };
}

export interface ResetPasswordPageState {
  isLoading: boolean;
  token: string;
  password: string;
}
