import { Trip } from 'modules/trips/interfaces';

export interface TripsPageProps {
  trips: Trip[];
  trip: Trip;
  displaySnackMessage?: (message) => Promise<any>;
  getAllUserTrips: () => Promise<any>;
  deleteSingleTrip: (id) => Promise<any>;
  history: {
    dateObject: object;
    push: (path: string, state?: object) => void;
  };
}

export interface TripsPageState {
  isLoading: boolean;
  trips: Trip[];
}
