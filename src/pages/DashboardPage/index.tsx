import Restrict from 'components/Restrict';
import PreferencePage from 'pages/PreferencePage';
import TripsPage from 'pages/TripsPage';
import * as React from 'react';

// pages
import ExplorePage from 'pages/ExplorePage';

// components
import RestrictedRoute from 'components/RestrictedRoute';

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
import { NavLink, Redirect, Route, Switch } from 'react-router-dom';

// interfaces
import { DashboardPageProps } from './interfaces';

// styles
import './DashboardPage.scss';

// helpers
import authorize from 'utils/helpers/authorize';

const DashboardPage: React.SFC<DashboardPageProps> = (props) => {
  const [isDrawerOpen, setDrawerOpen] = React.useState<boolean>(false);
  const [isMenuOpen, setMenuOpen] = React.useState<boolean>(false);
  const menuAnchorEl = React.useRef<any>(null);
  const onDrawerClose = () => {
    setDrawerOpen(false);
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
                src="https://res.cloudinary.com/mashafrancis/image/upload/v1552641620/kari4me/nan.jpg"/>
              </span>
            </div>
          </TopAppBarIcon>
          </div>
        </TopAppBarSection>
      </TopAppBarRow>
    </TopAppBar>
  );

  const userModal = () => (
    <div className="account-menu">
      <p className="overline">Signed in as:</p>
      <p className="body-1">francismasha96@gmail.com</p>
      <div className="account-menu__actions">
        <button className="mdc-button mdc-button--raised mdc-ripple-upgraded">
          <span className="mdc-button__label">Sign out</span>
        </button>
        <button className="mdc-button">
          <span className="mdc-button__label">View Profile</span>
        </button>
      </div>
    </div>
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

  const drawerContent = url => (
    <React.Fragment>
      <List>
        <Restrict authorize="explore:view">
          <NavLink to={`${url}/explore`}>
            <ListItem onClick={() => setDrawerOpen(false)}>
              <ListItemGraphic graphic={<MaterialIcon icon="explore" initRipple={null}/>}/>
              <ListItemText primaryText="Explore"/>
            </ListItem>
          </NavLink>
        </Restrict>
        <Restrict authorize="trips:view">
          <NavLink to={`${url}/trips`}>
            <ListItem onClick={() => setDrawerOpen(false)}>
              <ListItemGraphic graphic={<MaterialIcon icon="flight" initRipple={null}/>}/>
              <ListItemText primaryText="Trips"/>
            </ListItem>
          </NavLink>
        </Restrict>
        <Restrict authorize="preferences:view">
          <NavLink to={`${url}/preferences`}>
            <ListItem onClick={() => setDrawerOpen(false)}>
              <ListItemGraphic graphic={<MaterialIcon icon="settings" initRipple={null}/>}/>
              <ListItemText primaryText="Preferences"/>
            </ListItem>
          </NavLink>
        </Restrict>
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
          {drawerContent(props.match.url)}
        </DrawerContent>
      </Drawer>
      {topBar()}
        <MenuSurface
          open={isMenuOpen}
          anchorCorner={Corner.BOTTOM_LEFT}
          onClose={() => setMenuOpen(false)}
          anchorElement={menuAnchorEl.current}
        >
          {userModal()}
        </MenuSurface>
      <TopAppBarFixedAdjust className="drawer-content">
        <Switch>
          <RestrictedRoute
            exact
            path={`${props.match.url}`}
            render={() => checkPermissions(props.match.url)}
          />
          <RestrictedRoute
            authorize={['explore:view']}
            path={`${props.match.url}/explore`}
            component={ExplorePage}
          />
          <RestrictedRoute
            authorize={['trips:view']}
            path={`${props.match.url}/trips`}
            component={TripsPage}
          />
          <RestrictedRoute
            authorize={['preferences:view']}
            path={`${props.match.url}/preferences`}
            component={PreferencePage}
          />
          <Redirect to="/404" />
        </Switch>
        </TopAppBarFixedAdjust>
    </div>
  );
};

export default DashboardPage;
