import * as React from 'react';

// third-party libraries
import Drawer, {
  DrawerContent,
  DrawerHeader,
} from '@material/react-drawer';
import List, {
  ListDivider,
  ListGroup,
  ListGroupSubheader,
  ListItem,
  ListItemGraphic,
  ListItemText
} from '@material/react-list';
import MaterialIcon from '@material/react-material-icon';

// components
import { MenuContext } from '@components/Context';
import { Menus } from '@components/MenusRoutes';

// interfaces
import { MenuContentProps } from './interfaces';

// styles
import '@pages/DashboardContainer/DashboardNavBar.scss';

const avatar = 'https://res.cloudinary.com/mashafrancis/image/upload/v1552641620/kari4me/nan.jpg';
const viewPort = window.innerWidth;

const mobileHeader = (name, photo) => (
  <div className="header-image">
    <span className="mini-menu__image">
    <img
      className="mini-menu__image"
      src={photo || avatar}
      alt="avatar"
    />
      <h5>{name || 'Anonymous'}</h5>
    </span>
</div>
);

const mobileDrawerHeader = (setOpen, name, photo) => {
  return (
  <React.Fragment>
    <DrawerHeader>
      <div className="drawer-logo">
        <div role="tablist"
             className="mdc-tab-bar"
             onClick={() => setOpen(false)}
        >
          {(viewPort < 539) && mobileHeader(name, photo)}
        </div>
      </div>
    </DrawerHeader>
  </React.Fragment>
  );
};

const drawerContent = (selectedIndex, setSelectedIndex, setOpen, logoutUser) => (
  <React.Fragment>
    <ListGroup>
      {(viewPort < 539) && <ListDivider tag="div" />}
      <List
        singleSelection
        selectedIndex={selectedIndex}
      >
        {
          Menus.map((group, groupIndex) => (
            <React.Fragment key={groupIndex} >
              {group.map((item, itemIndex) => (
                <ListItem
                  key={`${groupIndex}.${itemIndex}`}
                  className={(selectedIndex.group === groupIndex && selectedIndex.item === itemIndex) && 'mdc-list-item--selected'}
                  onClick={() => setSelectedIndex({ group: groupIndex, item: itemIndex }) && setOpen(false)} >
                  <ListItemGraphic graphic={<MaterialIcon icon={item.icon} initRipple={null} />} />
                  <ListItemText primaryText={item.primaryText} />
                </ListItem >)
              )}
              < ListDivider tag="div" />
              {groupIndex === 0 ? <ListGroupSubheader tag="h3">Do more with your account</ListGroupSubheader> : null}
            </React.Fragment>
          ))
        }
        <ListItem onClick={logoutUser}>
          <ListItemGraphic graphic={<MaterialIcon icon="exit_to_app"/>} />
          <ListItemText primaryText="Logout"/>
        </ListItem>
      </List>
    </ListGroup>
    <footer className="drawer-footer">
      <a className="footer-text" href="https://www.mobilities.com/privacy" target="_blank" rel="noopener">Privacy</a> ·
      <a className="footer-text" href="https://www.mobilities.com/tos" target="_blank" rel="noopener">Terms</a> ·
      <a className="footer-text" href="https://www.mobilities.com/about" target="_blank" rel="noopener">About</a>
    </footer>
  </React.Fragment>
);

export const MenuContent: React.FunctionComponent<MenuContentProps> = (props) => {
  const menu = React.useContext(MenuContext);
  const { isOpen, setOpen, selectedIndex, setSelectedIndex, logoutUser } = menu;
  return (
    <Drawer
      modal={(viewPort < 539)}
      open={isOpen}
      onClose={() => setOpen(false)}
    >
      {mobileDrawerHeader(setOpen, props.name, props.photo)}
      <DrawerContent>
        {drawerContent(selectedIndex, setSelectedIndex, setOpen, logoutUser)}
      </DrawerContent>
    </Drawer>
  );
};
