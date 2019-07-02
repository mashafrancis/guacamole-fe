import UserModal from 'components/UserModal';
import * as React from 'react';

// third-party libraries
import Drawer, {
  DrawerContent,
  DrawerHeader,
} from '@material/react-drawer';
import List, {
  ListItem,
  ListItemGraphic,
  ListItemText
} from '@material/react-list';
import MaterialIcon from '@material/react-material-icon';
import MenuSurface, { Corner } from '@material/react-menu-surface';
import TopAppBar, {
  TopAppBarFixedAdjust,
  TopAppBarIcon,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
} from '@material/react-top-app-bar';
import { NavLink, Redirect } from 'react-router-dom';

// interfaces
import { DashboardNavBarProps } from './interfaces';

// styles
import './DashboardNavBar.scss';

// helpers
import authorize from 'utils/helpers/authorize';

const DashboardNavBar: React.SFC<DashboardNavBarProps> = (props) => {
  const mainContentEl = React.createRef();
  const [isDrawerOpen, setDrawerOpen] = React.useState<boolean>(false);
  const [isMenuOpen, setMenuOpen] = React.useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const menuAnchorEl = React.useRef<any>(null);

  const onDrawerClose = () => {
    setDrawerOpen(false);
  };

  const onSelectedIndex = () => {
    setSelectedIndex(1);
  };

  /**
   * Checks the permissions and redirects users
   * to the page they have permission  to view
   *
   * @param {String} url
   *
   * @returns {JSX}
   */
  const checkPermissions = (url) => {
    if (authorize(['explore:view'])) {
      return <Redirect to={`${url}/explore`} />;
    }
    if (authorize(['trips:view'])) {
      return <Redirect to={`${url}/trips`} />;
    }
    if (authorize(['preferences:view'])) {
      return <Redirect to={`${url}/preferences`} />;
    }
  };

  const topBar = () => (
    <TopAppBar className="dashboard-nav">
      <TopAppBarRow>
        <TopAppBarSection align="start">
          <TopAppBarIcon navIcon tabIndex={0}>
            <MaterialIcon
              onClick={() => setDrawerOpen(true)}
              hasRipple icon="menu"
              initRipple={null}
            />
          </TopAppBarIcon>
          <TopAppBarTitle>
            <NavLink to={'/'}>Kari4me</NavLink>
          </TopAppBarTitle>
        </TopAppBarSection>
        <TopAppBarSection align="end" role="toolbar">
          <div className="companion-nav">
          <TopAppBarIcon navIcon tabIndex={0}>
            <MaterialIcon
              onClick={() => setDrawerOpen(true)}
              hasRipple icon="notifications"
              initRipple={null}
            />
          </TopAppBarIcon>
          <TopAppBarIcon actionItem tabIndex={0}>
            <div role="tablist"
                 ref={e => menuAnchorEl.current = e}
                 className="mdc-tab-bar"
                 onClick={() => setMenuOpen(true)}
            >
              <span className="mini-account-menu__image">
              <img
                className="mini-account-menu__image"
                src={props.user.photo}/>
              </span>
            </div>
          </TopAppBarIcon>
          </div>
        </TopAppBarSection>
      </TopAppBarRow>
    </TopAppBar>
  );

  const sideNav = () => (
    <div className="side-nav">
      <div className="side-nav__top">
        <List twoLine>
          <ListItem onClick={() => setDrawerOpen(false)}>
            <ListItemGraphic graphic={<MaterialIcon icon="explore" initRipple={null}/>}/>
            <ListItemText secondaryText="Explore"/>
          </ListItem>
        </List>
      </div>
    </div>
  );

  const drawerContent = () => (
    <React.Fragment>
      <List singleSelection selectedIndex={selectedIndex}>
        <NavLink to={'/explore'}>
          <ListItem onClick={() => setDrawerOpen(false)}>
            <ListItemGraphic graphic={<MaterialIcon icon="explore" initRipple={null}/>}/>
            <ListItemText primaryText="Explore"/>
          </ListItem>
        </NavLink>
        <NavLink to={'/trips'}>
          <ListItem onClick={() => setDrawerOpen(false)}>
            <ListItemGraphic graphic={<MaterialIcon icon="flight" initRipple={null}/>}/>
            <ListItemText primaryText="Trips"/>
          </ListItem>
        </NavLink>
        <NavLink to={'/preferences'}>
          <ListItem onClick={() => setDrawerOpen(false)}>
            <ListItemGraphic graphic={<MaterialIcon icon="settings" initRipple={null}/>}/>
            <ListItemText primaryText="Preferences"/>
          </ListItem>
        </NavLink>
      </List>
    </React.Fragment>
  );

  return (
    <div className="dashboard">
      <Drawer
        modal
        open={isDrawerOpen}
        onClose={onDrawerClose}
        // innerRef={this.drawerEl}
      >
        <DrawerHeader>
          <div className="drawer-logo">
            <h2 className="mdc-typography--headline6">Kari4me</h2>
          </div>
        </DrawerHeader>
        <DrawerContent>
          {drawerContent()}
        </DrawerContent>
      </Drawer>
      {topBar()}
        <MenuSurface
          open={isMenuOpen}
          anchorCorner={Corner.BOTTOM_LEFT}
          onClose={() => setMenuOpen(false)}
          anchorElement={menuAnchorEl.current}
        >
          <UserModal
            user={props.user}
            logoutUser={props.logoutUser}
          />
        </MenuSurface>
      <TopAppBarFixedAdjust className="drawer-content">
        {props.component}
        </TopAppBarFixedAdjust>
    </div>
  );
};

export default DashboardNavBar;
