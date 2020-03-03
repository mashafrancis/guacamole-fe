// react libraries
import CardTravelIcon from '@material-ui/icons/CardTravel';
import ExploreIcon from '@material-ui/icons/Explore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { ExplorePage } from '@pages/ExplorePage';
import PreferencePage from '@pages/PreferencePage';
import { TripsPage } from '@pages/TripsPage';
import * as React from 'react';

// third party packages
import { Redirect, Route, Switch } from 'react-router-dom';

// pages

export const Menus = [
  {
    navLink: '/explore',
    icon: 'explore',
    primaryText: 'Explore',
    component: ExplorePage,
  },
  {
    navLink: '/trips',
    icon: 'card_travel',
    primaryText: 'Trips',
    component: TripsPage,
  },
  {
    navLink: '/preferences',
    icon: 'settings',
    primaryText: 'Preferences',
    component: PreferencePage,
  },
];

export const BottomMenus = [
  {
    navLink: '/notifications',
    icon: 'settings_applications',
    primaryText: 'Settings',
    component: ExplorePage,
  },
  {
    navLink: '/notifications',
    icon: 'launch',
    primaryText: 'Help',
    component: TripsPage,
  },
  {
    navLink: '/preferences',
    icon: 'launch',
    primaryText: 'Send feedback',
    component: PreferencePage,
  },
];

export const BottomNavigationMenus = [
  {
    icon: <ExploreIcon />,
    label: 'Explore',
    value: 'explore',
  },
  {
    icon: <CardTravelIcon />,
    label: 'Trips',
    value: 'trips',
  },
  {
    icon: <FavoriteIcon />,
    label: 'Favorites',
    value: 'favorites',
  },
  {
    icon: <FavoriteIcon />,
    label: 'More',
    value: 'more',
  },
];
