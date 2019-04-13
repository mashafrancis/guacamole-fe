import { UserDetails } from 'modules/user/interfaces';

export interface HomePageProps {
  error?: object;
  user?: UserDetails;
}

export interface HomePageState {
  isLoading: boolean;
}
