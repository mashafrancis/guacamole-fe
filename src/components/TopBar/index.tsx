import * as React from 'react';

// third-party libraries
import MaterialIcon from '@material/react-material-icon';
import TopAppBar, {
  TopAppBarIcon,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
} from '@material/react-top-app-bar';
import { NavLink } from 'react-router-dom';

// utils
import { MenuContext } from '../Context';

// interface
import { TopBarProps } from './interfaces';

const viewPort = window.innerWidth;

export const TopBar: React.FunctionComponent<TopBarProps> = (props) => {
  const menu = React.useContext(MenuContext);

  const renderTopRightIcons = () => (
    <div className="companion-nav">
      {
        props.topIcons.map((topIcon, index) => {
          return (
            <TopAppBarIcon key={index} navIcon tabIndex={0}>
              <MaterialIcon
                onClick={topIcon.clickEvent}
                hasRipple icon={topIcon.icon}
                initRipple={null}
              />
            </TopAppBarIcon>
          );
        })
      }
      {(viewPort > 539) && props.photoImage}
    </div>
  );

  return (
    <TopAppBar className="dashboard-mobile-nav">
      <TopAppBarRow>
        <TopAppBarSection align="start">
          {(viewPort < 539) &&
          <TopAppBarIcon navIcon tabIndex={0}>
            <MaterialIcon
              onClick={() => menu.setOpen(true)}
              hasRipple icon="menu" initRipple={null}/>
          </TopAppBarIcon>}
          <TopAppBarTitle>
            <NavLink to={'/'}>
              <div className="app-logo">
                <img
                  className="app-logo__image"
                  src="https://res.cloudinary.com/almondgreen/image/upload/v1579108573/Mobilities/logo_mobilities_mhg0nn.png"
                  alt="Logo"/>
                <h4>Mobilities</h4>
              </div>
            </NavLink>
          </TopAppBarTitle>
          {
            viewPort > 539 &&
            <React.Fragment>
              <div className="topbar-divider topbar-lockup-divider"/>
              <div className="topbar-title">
                <h4>Explore Page</h4>
              </div>
            </React.Fragment>
          }
        </TopAppBarSection>
        <TopAppBarSection align="end" role="toolbar">
          {renderTopRightIcons()}
        </TopAppBarSection>
      </TopAppBarRow>
    </TopAppBar>
  );
};
