import { UserDetails } from 'modules/user/interfaces';

export interface AuthHeaderProps {
  user: UserDetails;
  location: {
    pathname: string;
  };
  logoutUser?: () => void;
  getCenters: () => Promise<any>;
  availableCenters: Center[];
  getUserDetails: (userId: string) => Promise<any>;
  editUserCenter: (userId: string, userCenterId: string) => Promise<any>;
  createNewUser: (newPersonData: Object, isCenterUpdate: boolean) => Promise<any>;
}

export interface AuthHeaderState {
  dropDownHidden: boolean;
  isUserExisting: boolean;
}
