import { Trip } from 'modules/trips/interfaces';

export interface UserTripCardProps {
  trip: Trip;
  redirect?: (tripId: string) => void;
  onEdit?: () => void;
  onDelete: () => void;
  history?: {
    dateObject: object;
    push: (path: string, state?: object) => void;
  };
  match?: {
    url: string
  };
}
