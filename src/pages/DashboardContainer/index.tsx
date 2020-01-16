import * as React from 'react';

// third-party libraries
import { connect } from 'react-redux';

// components
import { MenuContext } from '@components/Context';
import { MenuContent } from '@components/MenuContent';
import { TopBar } from '@components/TopBar';
import { TopAppBarFixedAdjust, TopAppBarIcon } from '@material/react-top-app-bar';

// thunks
import { logoutUser } from '@modules/user';

// interfaces
import { DashboardContainerProps, DashboardContainerState } from './interfaces';

// styles
import './DashboardContainer.scss';

const viewPort = window.innerWidth;

const DashboardContainer: React.FunctionComponent<DashboardContainerProps> = (props) => {
  const [state, setState] = React.useState<DashboardContainerState>({
    isOpen: false,
    isMenuOpen: false,
    selectedIndex: 0,
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
    // @ts-ignore
    setState({
      menu: {
        ...menu,
        isOpen: menu.isOpen = isOpen,
      },
    });
  };

  const setSelectedIndex = () => {
    setState({ ...state, selectedIndex: 1 });
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
      src={props.user.photo}
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

  const { component, user } = props;
  const { isOpen, selectedIndex } = state.menu;

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
        <MenuContent name={user.name} photo={user.photo}/>
        <TopBar photoImage={photoImage()} topIcons={topIcons}/>
        <TopAppBarFixedAdjust>{component}</TopAppBarFixedAdjust>
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
