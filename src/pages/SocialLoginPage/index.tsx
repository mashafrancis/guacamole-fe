import * as React from 'react';

// third-party libraries
import { Cell, Grid, Row } from '@material/react-layout-grid';
import MaterialIcon from '@material/react-material-icon';
import { NavLink } from 'react-router-dom';

// components
import AuthHeader from 'components/AuthHeader';

// interfaces
import { SocialLoginPageProps, SocialLoginPageState } from './interfaces';

// styles
import './SocialRegisterPage.scss';

export class SocialLoginPage extends React.Component<SocialLoginPageProps, SocialLoginPageState> {
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
            <img height="24" width="24"
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
      <NavLink className=".kirk-itemChoice-label kirk-itemChoice mb-l" to={'/login/email'}>
        <div className="kirk-itemChoice-label">Use your email</div>
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
          forwardButtonName="Register"
          backwardButtonName="Home"
          forwardLink={'/register'}
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
              <h1 className="headline-2">How do you want to log in?</h1>
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
              <h4 className="headline-5">Not a member yet? <NavLink to={'/register'}>Sign Up</NavLink></h4>
            </Cell>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default SocialLoginPage;
