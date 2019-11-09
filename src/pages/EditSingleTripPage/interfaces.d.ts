import { Trip } from 'modules/trips/interfaces';
import { Location } from 'pages/TripsPageForm/interfaces';

export interface EditSingleTripPageProps {
  editTrip: (trip) => Promise<any>;
  displaySnackMessage?: (message) => Promise<any>;
  error?: object;
  trips: Trip[];
  history: {
    push: (url: string) => void;
  }
}

export interface EditSingleTripPageState {
  isLoading: boolean;
  isValid: boolean;
  focused: boolean;
  dates: {
    [key: string]: string | number | any
  };
  fields: {
    [key: string]: string | number | any
  };
  errors: {
    [key: string]: string
  };
  locations: {
    origin: Location,
    destination: Location,
  };
  trip: Trip;
}

interface Location {
  country: string;
  region: string;
}
