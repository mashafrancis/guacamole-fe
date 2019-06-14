export interface TripsPageFormProps {
  addNewTrip: (trip) => Promise<any>;
  displaySnackMessage?: (message) => Promise<any>;
  error?: object;
}

export interface TripsPageFormState {
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
