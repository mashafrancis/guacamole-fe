import { Location } from 'history';
import { UserDetails } from 'modules/user/interfaces';

export interface AppProps {
  user: UserDetails;
  getUserDetails: (userId: string) => Promise<any>;
  location: Location;
  serverError: { error: boolean };
}

export interface AppState {
  isGettingUserDetails: boolean;
  isUserAuthenticated: boolean;
}
