import { UserDetails } from '@modules/user/interfaces';

export interface DashboardContainerProps {
  drawerEl?: object;
  match?: {
    url: string;
  };
  history: {
    push: (url: string) => void;
  }
  component: any;
  user?: UserDetails;
  logoutUser: () => void;
}

export interface DashboardContainerState {
  isOpen: boolean;
  isMenuOpen: boolean;
  selectedIndex: {
    group: number;
    item: number
  };
  isLoading: boolean;
  isFeedbackMenuOpen: boolean;
  isFeedbackModal: boolean;
  action: string;
  feedback: '';
  menu: {
    isOpen: boolean;
    selectedIndex: number;
  };
  fields: {
    [key: string]: string | number
  };
}
