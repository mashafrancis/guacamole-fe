import ExplorePage from '@pages/ExplorePage';
import TripsPage from '@pages/TripsPage';
import PreferencePage from '@pages/PreferencePage';
import { ComponentsProps } from './interfaces.d';
import PageNotFound from '@components/PageNotFound';

export const Menus: Array<Array<ComponentsProps>> = [
    [
        {
            'primaryText': 'Explore',
            'component': ExplorePage,
            'icon': 'explore'
        },
        {
            'primaryText': 'Trips',
            'component': TripsPage,
            'icon': 'card_travel'
        },
        {
            'primaryText': 'Preferences',
            'component': PreferencePage,
            'icon': 'settings'
        }
    ],
    [
        {
            'primaryText': 'Settings',
            'component': PageNotFound,
            'icon': 'settings_applications'
        },
        {
            'primaryText': 'Send Feedback',
            'component': PageNotFound,
            'icon': 'launch',
        },
        {
            'primaryText': 'Help',
            'component': PageNotFound,
            'icon': 'launch'
        }
    ],
]