import { Trip } from 'modules/trips/interfaces';

export interface TripsPageProps {
  trips: Trip[];
  displaySnackMessage?: (message) => Promise<any>;
  getAllUserTrips: () => Promise<any>;
  history: {
    dateObject: object;
    push: (path: string, state?: object) => void;
  };
}

export interface TripsPageState {
  isLoading: boolean;
}
