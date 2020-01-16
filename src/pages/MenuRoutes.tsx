// react libraries
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
