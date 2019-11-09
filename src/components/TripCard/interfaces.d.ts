import { Trip } from '@modules/trips/interfaces';

export interface TripCardProps {
  trip: Trip;
  setShowingSingleTrip: (showingSingleTrip: boolean) => void;
  requestTrip?: (tripId: string) => void;
  isOwner: boolean;
  handleDeleteTrip?: () => void;
  link?: string;
  setSelectedTrip: (tripId: string) => void;
}
