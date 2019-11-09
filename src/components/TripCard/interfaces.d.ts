import { Trip } from '@modules/trips/interfaces';

export interface TripCardProps {
  trip: Trip;
  setShowingSingleTrip: (showingSingleTrip: boolean) => void;
  requestTrip?: (tripId: string) => void;
  setSelectedTrip: (tripId: string) => void;
}
