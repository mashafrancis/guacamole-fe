import { UserDetails } from 'components/NavBar/interfaces';
import { Location } from 'history';

export interface AppProps {
  user: UserDetails;
  getUserDetails: (userId: string) => Promise<any>;
  logoutUser: () => void;
  location: Location;
  serverError: { error: boolean };
}

export interface AppState {
  isGettingUserDetails: boolean;
  isUserAuthenticated: boolean;
  showUnauthorizedUserModal: boolean;
}
