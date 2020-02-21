import * as React from 'react';

// third-party libraries
import { connect } from 'react-redux';

// components
import PageBottomNavigation from '@components/BottomNavigation';
import { MenuContext } from '@components/Context';
import { MenuContent } from '@components/MenuContent';
import { Menus } from '@components/MenusRoutes';
import { TopBar } from '@components/TopBar';
import UserModal from '@components/UserModal';
import MenuSurface, { Corner } from '@material/react-menu-surface';
import { TopAppBarFixedAdjust, TopAppBarIcon } from '@material/react-top-app-bar';

// thunks
import { logoutUser } from '@modules/user';

// interfaces
import { DashboardContainerProps, DashboardContainerState } from './interfaces';

// styles
import './DashboardContainer.scss';

const viewPort = window.innerWidth;
const avatar = 'https://res.cloudinary.com/almondgreen/image/upload/v1580208660/Mobilities/avatar_ast4yi.jpg';

const DashboardContainer: React.FunctionComponent<DashboardContainerProps> = (props) => {
  const [state, setState] = React.useState<DashboardContainerState>({
    isOpen: false,
    isMenuOpen: false,
    selectedIndex: {
      group: 0,
      item: 0,
    },
    isLoading: true,
    isFeedbackMenuOpen: false,
    isFeedbackModal: false,
    action: '',
    fields: {},
    feedback: '',
    menu: {
      isOpen: false,
      selectedIndex: 0,
    },
  });

  const menuAnchorEl = React.useRef<any>(null);

  const setOpen = (isOpen: boolean) => {
    const menu = state.menu;
    setState({
      ...state,
      menu: {
        ...menu,
        isOpen: menu.isOpen = isOpen,
      },
    });
  };

  const setSelectedIndex = (selectedIndex: { group: number, item: number }) => {
    setState({ ...state, selectedIndex });
  };

  const onMenuOpenClose = () => {
    setState({ ...state, isMenuOpen: !state.isMenuOpen });
  };

  const logoutUser = () => {
    window.location.replace('/');
    props.logoutUser();
  };

  const photoImage = () => (
    <TopAppBarIcon actionItem tabIndex={0}>
      <div role="tablist"
        ref={e => menuAnchorEl.current = e}
        className="mdc-tab-bar"
        onClick={() => setState({ ...state, isOpen: true })}
      >
    <span className="mini-account-menu__image">
    {(viewPort > 539) &&
    <img
      className="mini-account-menu__image"
      src={props.user.photo || avatar}
      alt="image"/>}
    </span>
      </div>
    </TopAppBarIcon>
  );

  const topIcons = [
    {
      icon: 'notifications_none',
      clickEvent: () => setState({ ...state, isFeedbackMenuOpen: true, isFeedbackModal: false }),
    },
    {
      icon: 'more_vert',
      clickEvent: () => setState({ ...state, isFeedbackMenuOpen: true, isFeedbackModal: false }),
    },
  ];

  const { user, history } = props;
  const { isOpen } = state.menu;
  const { selectedIndex } = state;

  return (
    <MenuContext.Provider
      value={{
        isOpen,
        selectedIndex,
        setSelectedIndex,
        setOpen,
        logoutUser,
      }}
    >
      <div className="dashboard">
        <MenuContent
          name={`${user.first_name} ${user.last_name}`}
          photo={user.photo}
        />
        <TopBar
          photoImage={photoImage()}
          topIcons={topIcons}
        />
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
        {
          (viewPort < 539)
            ?
          <div className="page-content">
            <TopAppBarFixedAdjust className="drawer-content">
              {React.createElement(Menus[selectedIndex.group][selectedIndex.item].component, { history })}
            </TopAppBarFixedAdjust>
            <PageBottomNavigation />
          </div>
            :
            <TopAppBarFixedAdjust className="drawer-content">
              {React.createElement(Menus[selectedIndex.group][selectedIndex.item].component, { history })}
            </TopAppBarFixedAdjust>
        }
      </div>
    </MenuContext.Provider>
  );
};

export const mapStateToProps = state => ({
  user: state.user,
});

export const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
