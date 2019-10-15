import { Trip } from 'modules/trips/interfaces';

export interface TripCardProps {
  trip: Trip;
  redirect: (tripId: string) => void;
  requestTrip: (tripId: string) => void;
}
