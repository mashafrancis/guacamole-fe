import { Trip } from 'modules/trips/interfaces';

export interface ExplorePageProps {
  isLoading: boolean;
  trips: Trip[];
  displaySnackMessage?: (message) => Promise<any>;
  error?: object;
  getAllTrips: () => Promise<any>;
}

export interface ExplorePageState {
  isLoading: boolean;
}
