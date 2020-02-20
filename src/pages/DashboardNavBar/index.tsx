import UserModal from '@components/UserModal';
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
import { Menus } from '@components/MenusRoutes';
import authorize from '@utils/helpers/authorize';

const avatar = 'https://res.cloudinary.com/mashafrancis/image/upload/v1552641620/kari4me/nan.jpg';
const viewPort = window.innerWidth;

const DashboardNavBar: React.SFC<DashboardNavBarProps> = (props) => {
  const [state, setState] = React.useState<DashboardNavBarState>({
    isDrawerOpen: false,
    isMenuOpen: false,
    selectedItem: {
      group: 0,
      item: 0,
    },
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

  const onSelectedIndex = async (selectedItem: {group: number, item: number}) => {
    await setState({ ...state, selectedItem });
  };

  const onDrawerOpen = () => {
    setState({ ...state, isDrawerOpen: true });
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
      return <Redirect to={`${url}/dashboard`} />;
    }
    if (authorize(['trips:view'])) {
      return <Redirect to={`${url}/dashboard`} />;
    }
    if (authorize(['preferences:view'])) {
      return <Redirect to={`${url}/dashboard`} />;
    }
  };

  const topBar = () => (
    <TopAppBar className="dashboard-nav">
      <TopAppBarRow>
        <TopAppBarSection align="start">
          {(viewPort < 539) &&
            <TopAppBarIcon navIcon tabIndex={0}>
              <MaterialIcon onClick={onDrawerOpen} hasRipple icon="menu" initRipple={null} />
            </TopAppBarIcon>}
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
                    src={props.user.photo}
                    alt="account"/>
                </span>
              </div>
            </TopAppBarIcon>
          </div>
        </TopAppBarSection>
      </TopAppBarRow>
    </TopAppBar>
  );

  const menuItems = () => Menus.map((group, groupIndex) => (
    <React.Fragment key={groupIndex} >
      {group.map((item, itemIndex) => (
        <ListItem
          key={`${groupIndex}.${itemIndex}`}
          className={state.selectedItem.group === groupIndex && state.selectedItem.item === itemIndex ? 'mdc-list-item--selected' : ''}
          onClick={() => onSelectedIndex({ group: groupIndex, item: itemIndex })}
        >
          <ListItemGraphic graphic={<MaterialIcon icon={item.icon} initRipple={null} />} />
          <ListItemText primaryText={item.primaryText} />
        </ListItem >)
      )}
      < ListDivider tag="div" />
    </React.Fragment>
  ));

  const drawerContent = () => (
    <React.Fragment>
      <ListGroup>
        {(viewPort < 539) && <ListDivider tag="div" />}
        <List singleSelection >
          {menuItems()}
        </List>
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
        modal={(viewPort < 539)}
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
        {React.createElement(Menus[state.selectedItem.group][state.selectedItem.item].component)}
        </TopAppBarFixedAdjust>
    </div>
  );
};

export default DashboardNavBar;
