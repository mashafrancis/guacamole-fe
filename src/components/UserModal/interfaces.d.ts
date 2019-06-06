import { UserDetails } from 'modules/user/interfaces';

export interface UserModalProps {
  user: UserDetails;
  logoutUser: () => void;
}
