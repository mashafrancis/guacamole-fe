import { Trip } from '@modules/trips/interfaces';

export interface SingleTripPageProps {
  getSingleTrip: (tripId) => Promise<any>;
  getAllUserTrips: () => Promise<any>;
  trips: Trip[];
  trip: Trip;
  displaySnackMessage?: (message) => Promise<any>;
  match: {
    params: {
      id: string;
    };
  };
  history: {
    dateObject: object;
    push: (path: string, state?: object) => void;
  };
  requestTrip: (tripId) => Promise<any>;
}

export interface SingleTripPageState {
  isLoading: boolean;
  modalOpen: boolean;
  trips: Trip[];
}
