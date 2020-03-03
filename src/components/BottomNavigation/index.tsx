import * as React from 'react';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { makeStyles } from '@material-ui/core/styles';

// menus
import { MenuContext } from '@components/Context';
import { BottomNavigationMenus } from '@components/MenusRoutes';

// styles
import './BottomNavigation.scss';

const useStyles = makeStyles({
  root: {
    width: 'auto',
    paddingLeft: '10px',
    paddingRight: '10px',
  },
});

export const PageBottomNavigation = (props) => {
  const menu = React.useContext(MenuContext);
  const { setSelectedIndex } = menu;

  const selectedIndex = JSON.parse(window.localStorage.getItem('selectedIndex'));
  const [value, setValue] = React.useState(selectedIndex === null || undefined || false ? 0 : selectedIndex.item);

  const classes = useStyles(props);

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
              onClick={() => setSelectedIndex({ group: 0, item: index })}
              label={menu.label}
              icon={menu.icon}
            />
          );
        })
      }
    </BottomNavigation>
  );
};

export default PageBottomNavigation;
