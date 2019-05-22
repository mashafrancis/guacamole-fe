export interface AddNewPasswordPageProps {
  displaySnackMessage?: (message) => Promise<any>;
  error?: object;
  location: {
    search: string;
  };
}

export interface AddNewPasswordPageState {
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