import * as React from 'react';

// third-party libraries
import { Cell, Grid, Row } from '@material/react-layout-grid';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

// pages
import { SocialAuthentication } from '@pages/SocialAuthentication';

// components
import AuthButton from '@components/AuthButton';
import AuthHeader from '@components/AuthHeader';

// thunks
import { displaySnackMessage } from '@modules/snack';
import { socialAuthentication } from '@modules/socialAuth';

// interfaces
import { SocialLoginPageProps, SocialLoginPageState } from './interfaces';

const emailIco = 'https://res.cloudinary.com/mashafrancis/image/upload/v1559726766/kari4me/baseline-email-24px.svg';

export class SocialLoginPage extends React.Component<SocialLoginPageProps, SocialLoginPageState> {
  render() {
    const { history } = this.props
    return (
      <div className="register">
        <AuthHeader
          forwardButtonName="Register"
          backwardButtonName="Home"
          forwardAction={() => history.push('/register')}
          backwardAction={() => history.push('/') }
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
                {<SocialAuthentication
                  socialAuthentication={this.props.socialAuthentication}
                  displaySnackMessage={this.props.displaySnackMessage}
                />}
                <NavLink className="kirk-itemChoice mb-l" to={'/login/email'}>
                  <AuthButton
                    name="Login with your email"
                    image={emailIco}
                  />
                </NavLink>
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

export const mapDispatchToProps = dispatch => ({
  socialAuthentication: payload => dispatch(socialAuthentication(payload)),
  displaySnackMessage: message => dispatch(displaySnackMessage(message)),
});

export default connect(null, mapDispatchToProps)(SocialLoginPage);
