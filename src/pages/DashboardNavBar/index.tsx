import UserModal from 'components/UserModal';
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
  ListItemText,
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
import { DashboardNavBarProps, DashboardNavBarState } from './interfaces';

// styles
import './DashboardNavBar.scss';

// helpers
import authorize from 'utils/helpers/authorize';

const avatar = 'https://res.cloudinary.com/mashafrancis/image/upload/v1552641620/kari4me/nan.jpg';
const viewPort = window.innerWidth;

const DashboardNavBar: React.SFC<DashboardNavBarProps> = (props) => {
  const [state, setState] = React.useState<DashboardNavBarState>({
    isDrawerOpen: false,
    isMenuOpen: false,
    selectedIndex: 0,
    isLoading: true,
  });

  const mainContentEl = React.createRef();
  const menuAnchorEl = React.useRef<any>(null);

  const onDrawerOpenClose = () => {
    setState({ ...state, isDrawerOpen: false });
  };

  const onMenuOpenClose = () => {
    setState({ ...state, isMenuOpen: !state.isMenuOpen });
  };

  const onSelectedIndex = () => {
    setState({ ...state, selectedIndex: 1 });
  };

  const { user, logoutUser } = props;

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
              onClick={() => setState({ ...state, isDrawerOpen: true })}
              hasRipple icon="menu"
              initRipple={null}
            />
          </TopAppBarIcon>
          <TopAppBarTitle>
            <NavLink to={'/'}>Mobilities</NavLink>
          </TopAppBarTitle>
        </TopAppBarSection>
        <TopAppBarSection align="end" role="toolbar">
          <div className="companion-nav">
          <TopAppBarIcon navIcon tabIndex={0}>
            <MaterialIcon
              onClick={() => setState({ ...state, isDrawerOpen: true })}
              hasRipple icon="notifications"
              initRipple={null}
            />
          </TopAppBarIcon>
          <TopAppBarIcon actionItem tabIndex={0}>
            <div role="tablist"
                 ref={e => menuAnchorEl.current = e}
                 className="mdc-tab-bar"
                 onClick={() => setState({ ...state, isDrawerOpen: true })}
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

  const drawerContent = () => (
    <React.Fragment>
      <ListGroup>
        <ListDivider tag="div" />
      <List
        singleSelection
        selectedIndex={state.selectedIndex}
        handleSelect={onSelectedIndex}
      >
        <NavLink to={'/explore'}>
          <ListItem className="mdc-list-item" onClick={onDrawerOpenClose}>
            <ListItemGraphic graphic={<MaterialIcon icon="explore" initRipple={null}/>}/>
            <ListItemText primaryText="Explore"/>
          </ListItem>
        </NavLink>
        <NavLink to={'/trips'}>
          <ListItem className="mdc-list-item" onClick={onDrawerOpenClose}>
            <ListItemGraphic graphic={<MaterialIcon icon="card_travel" initRipple={null}/>}/>
            <ListItemText primaryText="Travels"/>
          </ListItem>
        </NavLink>
        <NavLink to={'/preferences'}>
          <ListItem className="mdc-list-item" onClick={onDrawerOpenClose}>
            <ListItemGraphic graphic={<MaterialIcon icon="settings" initRipple={null}/>}/>
            <ListItemText primaryText="Preferences"/>
          </ListItem>
        </NavLink>
      </List>
        <ListDivider tag="div" />
        <NavLink to={'/settings'}>
          <ListItem className="mdc-list-item" onClick={onDrawerOpenClose}>
            <ListItemText primaryText="Kenya"/>
          </ListItem>
        </NavLink>
        <NavLink to={'/notifications'}>
          <ListItem onClick={onDrawerOpenClose}>
            <ListItemText primaryText="East Africa"/>
          </ListItem>
        </NavLink>
        <NavLink to={'/notifications'}>
          <ListItem onClick={onDrawerOpenClose}>
            <ListItemText primaryText="World"/>
          </ListItem>
        </NavLink>

        <ListDivider tag="div" />
        <NavLink to={'/settings'}>
          <ListItem className="mdc-list-item" onClick={onDrawerOpenClose}>
            <ListItemText primaryText="Settings"/>
          </ListItem>
        </NavLink>
        <NavLink to={'/notifications'}>
          <ListItem onClick={onDrawerOpenClose}>
            <ListItemText primaryText="Send feedback"/>
            <ListItemGraphic graphic={<MaterialIcon className="drawer-more-info"  icon="launch"/>} />
          </ListItem>
        </NavLink>
        <NavLink to={'/notifications'}>
          <ListItem onClick={onDrawerOpenClose}>
            <ListItemText primaryText="Help"/>
            <ListItemGraphic graphic={<MaterialIcon className="drawer-more-info"  icon="launch"/>} />
          </ListItem>
        </NavLink>
        <ListItem onClick={props.logoutUser}>
          <ListItemText primaryText="Logout"/>
          <ListItemGraphic graphic={<MaterialIcon className="drawer-more-info"  icon="exit_to_app"/>} />
        </ListItem>
      </ListGroup>
    </React.Fragment>
  );

  const drawerHeader = () => (
    <React.Fragment>
      <DrawerHeader>
        <div className="drawer-logo">
          <h2 className="mdc-typography--headline6">Mobilities</h2>
        </div>
      </DrawerHeader>
    </React.Fragment>
  );

  return (
    <div className="dashboard">
      <Drawer
        modal
        open={state.isDrawerOpen}
        onClose={onDrawerOpenClose}
        // innerRef={this.drawerEl}
      >
        {drawerHeader()}
        <DrawerContent>
          {drawerContent()}
        </DrawerContent>
      </Drawer>
      {topBar()}
        <MenuSurface
          open={state.isMenuOpen}
          anchorCorner={Corner.BOTTOM_LEFT}
          onClose={onMenuOpenClose}
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
