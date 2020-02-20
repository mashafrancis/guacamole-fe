import { Trip } from '@modules/trips/interfaces';

export interface TripCardProps {
  trip: Trip;
  setShowingSingleTrip: (showingSingleTrip: boolean) => void;
  requestTrip?: (tripId: string) => void;
  isOwner: boolean;
  handleDeleteTrip?: () => void;
  setSelectedTrip: (tripId: string) => void;
  editTrip?: (editTrip: Trip) => void
}
