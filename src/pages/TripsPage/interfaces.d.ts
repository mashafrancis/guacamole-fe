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
  match: {
    url: string
  };
}

export interface TripsPageState {
  isLoading: boolean;
  isEditMode: boolean;
  isDeleteModal: boolean;
  trips: Trip[];
  action: string;
  trip?: Trip;
  trip_id: any;
}
