export interface UserProfilePageProps {
  displaySnackMessage?: (message) => Promise<any>;
  error?: object;
  location: {
    search: string;
  };
}

export interface UserProfilePageState {
  selectedIndex: any;
  open: boolean;
  isLoading?: boolean;
  isValid?: boolean;
  focused?: boolean;
  fields?: {
    [key: string]: string | number
  };
  errors?: {
    [key: string]: string
  };
}
