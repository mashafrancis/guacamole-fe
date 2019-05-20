import * as React from 'react';

// third-party libraries
import {
  Cell,
  Grid,
  Row
} from '@material/react-layout-grid';
import Drawer, {
  DrawerAppContent,
  DrawerContent
} from '@material/react-drawer';
import List, {
  ListGroup,
  ListItem,
  ListItemText
} from '@material/react-list';
import MaterialIcon from '@material/react-material-icon';
import TextField, { HelperText, Input } from '@material/react-text-field';
import { NavLink } from 'react-router-dom';

// components
import Button from 'components/Button';

// interfaces
import { UserProfilePageProps, UserProfilePageState } from './interfaces';

// styles
import '@material/react-layout-grid/dist/layout-grid.css';
// import '@material/react-list/dist/list.css';

export class UserProfilePage extends React.Component<UserProfilePageProps, UserProfilePageState> {
  state = {
    selectedIndex: 1,
    open: true,
    isLoading: false,
    isValid: true,
    focused: false,
    fields: {
      email: 'francismasha@gmail.com',
      firstName: 'francis',
      lastName: 'masha',
    },
    errors: {},
  };

  forwardArrow = () => {
    return (
      <React.Fragment>
        <NavLink to={'/'}>
          <span className="register-toolbar-actions">
            <div className="register__logo">
              <span className="product-logo-text">Profile</span>
            </div>
            <Button
              type="button"
              name="arrow_forward"
              classes="mdc-icon-button material-icons"
              aria_label="Go back to home page"
            />
          </span>
        </NavLink>
      </React.Fragment>
    );
  }

  backArrow = () => {
    return (
      <React.Fragment>
        <NavLink to={'/login'}>
          <span className="register-toolbar-actions">
            <Button
              type="button"
              name="arrow_back"
              classes="mdc-icon-button material-icons"
              aria_label="Go back to login page"
            />
            <div className="register__logo">
              <span className="product-logo-text">Home</span>
            </div>
          </span>
        </NavLink>
      </React.Fragment>
    );
  }

  renderHeader = () => {
    return (
      <React.Fragment>
        <header>
            {this.backArrow()}
            <div className="mini-account-menu">
              <div className="mini-account-menu--desktop">
                {this.forwardArrow()}
              </div>
              <div className="mini-account-menu--mobile">
                {this.forwardArrow()}
              </div>
            </div>
          </header>
      </React.Fragment>
    );
  }

  renderSubHeading = () => {
    return (
      <div className="mdc-layout-grid profile__header">
        <div className="mdc-layout-grid__inner">
          <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-11-desktop-hd
                          mdc-layout-grid__cell--span-3-phone mdc-layout-grid__cell--span-7-tablet
                          mdc-layout-grid__cell--span-11-desktop mdc-layout-grid__cell--align-middle">
            <h1 className="headline-2">Your Account Profile</h1>
          </div>
          <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-1-desktop-hd profile__share
                          mdc-layout-grid__cell--span-1-phone mdc-layout-grid__cell--span-1-tablet
                          mdc-layout-grid__cell--span-1-desktop mdc-layout-grid__cell--align-middle" />
        </div>
      </div>
    );
  }

  renderEditForm = () => {
    return (
      <React.Fragment>
          <div className="form-cell">
          <TextField
            className="mdc-text-field--fullwidth"
            outlined
            label="Email"
            leadingIcon={<MaterialIcon role="button" icon="email" initRipple={null}/>}
          >
            <Input
              value={this.state.fields.email}
              name="email"
              id="5"
              type="text"
            />
          </TextField>
          </div>
      </React.Fragment>
    );
  }

  renderPersonalInformation = () => {
    const { fields, errors } = this.state;

    return (
      <React.Fragment>
        <div className="form-cell">
          <TextField
            className="mdc-text-field--fullwidth"
            outlined
            label="Email"
            leadingIcon={<MaterialIcon role="button" icon="email" initRipple={null}/>}
            helperText={
              <HelperText
                className="mdc-text-field-invalid-helper"
                isValidationMessage={true}
                persistent={true}
                validation={true}>
                {'Edit your email'}
              </HelperText>}
          >
            <Input
              value={fields.email}
              name="email"
              id="5"
              type="text"
            />
          </TextField>
        </div>
        <div className="form-cell">
          <TextField
            className="mdc-text-field--fullwidth"
            outlined
            label="First Name"
            leadingIcon={<MaterialIcon role="button" icon="remove_red_eye" initRipple={null}/>}
            helperText={
              <HelperText
                className="mdc-text-field-invalid-helper"
                isValidationMessage={true}
                persistent={true}
                validation={true}>
                {'Edit your First Name'}
              </HelperText>}
          >
            <Input
              value={fields.firstName}
              name="First"
              id="6"
              type="text"
            />
          </TextField>
        </div>
      </React.Fragment>
    );
  }

  render() {
    return (
      <div className="register">
        {this.renderHeader()}
        <Grid>
          <Row>
            <Cell
              className="mdc-layout-grid__cell grid-start-5
                      mdc-layout-grid__cell--align-middle"
              desktopColumns={4}
              tabletColumns={7}
              phoneColumns={4}
            >
              <h1 className="headline-2">Your Profile Account</h1>
            </Cell>
          </Row>
          <Row>
            <Cell
              className="mdc-layout-grid__cell grid-start-5 register__section mdc-layout-grid__cell--align-middle"
              align="middle"
              order={5}
              desktopColumns={4}
              tabletColumns={4}
              phoneColumns={4}
            >
              {this.renderEditForm()}
            </Cell>
          </Row>
          <div className="mdc-layout-grid profile__content">

        </div>
        </Grid>
      </div>
    );
  }
}

export default UserProfilePage;
