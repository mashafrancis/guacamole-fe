import { Trip } from '@modules/trips/interfaces';

export interface SingleTripPageProps {
  getSingleTrip: (tripId) => Promise<any>;
  getAllUserTrips: () => Promise<any>;
  trips: Trip[];
  trip: Trip;
  displaySnackMessage?: (message) => Promise<any>;
  requestTrip: (tripId) => Promise<any>;
  selectedTripId: string;
  setSelectedTripId: (tripId: string) => void;
  setShowingSingleTrip: (showingSingleTrip: Boolean) => void;
  history: {
    push: (url: string) => void;
  }
}

export interface SingleTripPageState {
  isLoading: boolean;
  modalOpen: boolean;
  trips: Trip[];
}
