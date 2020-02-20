import { BottomNavigationMenus } from '@pages/MenuRoutes';
import * as React from 'react';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';

// styles
import './BottomNavigation.scss';

const useStyles = makeStyles({
  root: {
    width: 'auto',
  },
});

export const PageBottomNavigation = (props) => {
  const classes = useStyles(props);
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={`${classes.root} page-content__navigation`}
    >
      {
        BottomNavigationMenus.map((menu, index) => {
          return (
            <BottomNavigationAction
              key={index}
              label={menu.primaryText}
              icon={<NavLink to={menu.navLink}>{menu.icon}</NavLink>}
            />
          );
        })
      }
    </BottomNavigation>
  );
};

export default PageBottomNavigation;
