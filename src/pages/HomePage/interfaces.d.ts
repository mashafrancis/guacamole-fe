import { UserDetails } from 'modules/user/interfaces';

export interface HomePageProps {
  error?: object;
  user?: UserDetails;
  logoutUser: () => void;
}

export interface HomePageState {
  isLoading: boolean;
}
