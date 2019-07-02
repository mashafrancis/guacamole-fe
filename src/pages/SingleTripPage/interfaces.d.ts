import { Trip } from 'modules/trips/interfaces';

export interface SingleTripPageProps {
  getSingleTrip: (tripId) => Promise<any>;
  trip: Trip;
  displaySnackMessage?: (message) => Promise<any>;
  match: {
    params: {
      id: string;
    };
  };
}

export interface SingleTripPageState {
  isLoading: boolean;
}
