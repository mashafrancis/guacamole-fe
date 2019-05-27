import * as React from 'react';

// third-party libraries
import { Cell, Grid, Row } from '@material/react-layout-grid';
import MaterialIcon from '@material/react-material-icon';
import { NavLink } from 'react-router-dom';

// components
import AuthHeader from 'components/AuthHeader';

// interfaces
import { SocialRegisterPageProps, SocialRegisterPageState } from './interfaces';

// styles
// import '@material/react-layout-grid/dist/layout-grid.css';
import './SocialRegisterPage.scss';

export class SocialRegisterPage extends React.Component<SocialRegisterPageProps, SocialRegisterPageState> {
  renderFacebookRegister = () => (
    <React.Fragment>
      <button type="button" className="kirk-itemChoice mb-l" role="option" aria-selected="false">
          <div className="kirk-itemChoice-label">Continue with Facebook</div>
        <div className="kirk-itemChoice-right">
          <div className="kirk-itemChoice-rightAddon">
            <img height="24" width="24" alt="facebook"
              src="https://res.cloudinary.com/mashafrancis/image/upload/v1558929554/kari4me/f_logo_RGB-Blue_1024.png" />
          </div>
          <div className="kirk-itemChoice-chevron">
            <MaterialIcon icon="keyboard_arrow_right" initRipple={null}/>
          </div>
        </div>
      </button>
    </React.Fragment>
  )

  renderGoogleRegister = () => (
    <React.Fragment>
      <button type="button" className="kirk-itemChoice mb-l" role="option" aria-selected="false">
          <div className="kirk-itemChoice-label">Continue with Google</div>
        <div className="kirk-itemChoice-right">
          <div className="kirk-itemChoice-rightAddon">
            <img height="24" width="24" alt="facebook"
                 src="https://res.cloudinary.com/mashafrancis/image/upload/v1558904228/kari4me/Google__G__Logo.svg" />
          </div>
          <div className="kirk-itemChoice-chevron">
            <MaterialIcon icon="keyboard_arrow_right" initRipple={null}/>
          </div>
        </div>
      </button>
    </React.Fragment>
  )

  renderEmailRegister = () => (
    <React.Fragment>
      <NavLink className=".kirk-itemChoice-label kirk-itemChoice mb-l" to={'/register/email'}>
        <div className="kirk-itemChoice-label">Sign up with your email</div>
        <div className="kirk-itemChoice-right">
          <div className="kirk-itemChoice-chevron">
            <MaterialIcon icon="keyboard_arrow_right" initRipple={null}/>
          </div>
        </div>
      </NavLink>
    </React.Fragment>
  )

  render() {
    return (
      <div className="register">
        <AuthHeader
          forwardButtonName="Login"
          backwardButtonName="Home"
          forwardLink={'/login'}
          backwardLink={'/'}
        />
        <Grid>
          <Row>
            <Cell
              className="mdc-layout-grid__cell grid-start-4 mdc-layout-grid__cell--align-middle"
              columns={5}
              desktopColumns={5}
              tabletColumns={8}
            >
              <h1 className="headline-2">How do you want to sign up?</h1>
            </Cell>
          </Row>
          <Row>
            <Cell
              className="mdc-layout-grid__cell grid-start-4 register__section mdc-layout-grid__cell--align-middle"
              align="middle"
              columns={5}
              desktopColumns={5}
              tabletColumns={8}
            >
              <nav>
                {this.renderFacebookRegister()}
                {this.renderGoogleRegister()}
                {this.renderEmailRegister()}
              </nav>
            </Cell>
          </Row>
          <Row>
            <Cell
              className="mdc-layout-grid__cell grid-start-4 mdc-layout-grid__cell--align-middle"
              columns={5}
              desktopColumns={5}
              tabletColumns={8}
            >
              <h4 className="headline-5">Already a member? <NavLink to={'/login'}>Login</NavLink></h4>
            </Cell>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default SocialRegisterPage;
