export interface DashboardPageProps {
  drawerEl?: object;
  match: {
    url: string;
  };
}

export interface DashboardPageState {
  isDrawerOpen: boolean;
  selectedIndex: number;
  isProfileModalOpen: boolean;
}
