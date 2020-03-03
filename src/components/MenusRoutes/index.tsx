import MaterialIcon from '@material/react-material-icon';
import * as React from 'react';

// pages
import PageNotFound from '@components/PageNotFound';
import CardTravelIcon from '@material-ui/icons/CardTravel';
import ExploreIcon from '@material-ui/icons/Explore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExplorePage from '@pages/ExplorePage';
import PreferencePage from '@pages/PreferencePage';
import TripsPage from '@pages/TripsPage';

// interfaces
import { MenuProps } from './interfaces';

export const Menus: MenuProps[][] = [
  [
    {
      primaryText: 'Explore',
      component: ExplorePage,
      icon: 'explore',
    },
    {
      primaryText: 'Trips',
      component: TripsPage,
      icon: 'card_travel',
    },
    {
      primaryText: 'Preferences',
      component: PreferencePage,
      icon: 'settings',
    },
  ],
  [
    {
      primaryText: 'Settings',
      component: PageNotFound,
      icon: 'settings_applications',
    },
    {
      primaryText: 'Send Feedback',
      component: PageNotFound,
      icon: 'launch',
    },
    {
      primaryText: 'Help',
      component: PageNotFound,
      icon: 'launch',
    },
  ],
];

export const BottomNavigationMenus = [
  {
    icon: <MaterialIcon hasRipple icon="explore" initRipple={null}/>,
    label: 'Explore',
    value: 'explore',
  },
  {
    icon: <MaterialIcon hasRipple icon="card_travel" initRipple={null}/>,
    label: 'Trips',
    value: 'trips',
  },
  {
    icon: <MaterialIcon hasRipple icon="bookmarks" initRipple={null}/>,
    label: 'Bookmarked',
    value: 'bookmark',
  },
  {
    icon: <MaterialIcon hasRipple icon="more_horiz" initRipple={null}/>,
    label: 'More',
    value: 'more',
  },
];
