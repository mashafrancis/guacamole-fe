export interface TripsPageFormProps {
  addNewTrip: (trip) => Promise<any>;
  displaySnackMessage?: (message) => Promise<any>;
  error?: object;
  setShowingNewTripForm: (state)=> void
}

interface Location {
  country: string;
  region: string;
}

export interface TripsPageFormState {
  isLoading: boolean;
  isValid: boolean;
  focused: boolean;
  fields: {
    [key: string]: string | number | any
  };
  locations: {
    origin: Location,
    destination: Location,
  };
  dates: {
    [key: string]: string | number
  };
  errors: {
    [key: string]: string
  };
}
