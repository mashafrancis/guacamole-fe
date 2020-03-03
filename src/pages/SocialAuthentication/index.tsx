import * as React from 'react';

// third-party libraries
import { connect } from 'react-redux';

// components
import AuthButton from '@components/AuthButton';

// thunks
import { displaySnackMessage } from '@modules/snack';
import { socialAuthentication } from '@modules/socialAuth';

// types
import { SOCIAL_FACEBOOK_PROVIDER, SOCIAL_GOOGLE_PROVIDER } from '@modules/socialAuth/types';

// interfaces
import { SocialAuthenticationProps, SocialAuthenticationState } from './interfaces';

// helpers
import {
  auth,
  FacebookProvider,
  GoogleProvider,
} from '@utils/helpers/firebase';

export class SocialAuthentication extends React.Component<SocialAuthenticationProps, SocialAuthenticationState> {
  constructor(props) {
    super(props);
    this.state = {
      providers: [
        {
          provider: GoogleProvider,
          type: SOCIAL_GOOGLE_PROVIDER,
          platform: 'google-oauth2',
          image: 'https://res.cloudinary.com/mashafrancis/image/upload/v1558904228/kari4me/Google__G__Logo.svg',
          name: 'Continue with Google',
        },
        {
          provider: FacebookProvider,
          type: SOCIAL_FACEBOOK_PROVIDER,
          platform: 'facebook',
          name: 'Continue with Facebook',
          image: 'https://res.cloudinary.com/mashafrancis/image/upload/v1558929554/kari4me/f_logo_RGB-Blue_1024.png',
        },
      ],
    };
    this.getSocialAuthData = this.getSocialAuthData.bind(this);
  }

  getSocialAuthData = (oauthprovider, platform, authType) => {
    auth
      .signInWithPopup(oauthprovider)
      .then(response => ({
        type: authType,
        payload: {
          authData: {
            provider: platform,
            accessToken: response.credential.accessToken,
            accessSecret: response.credential.secret,
          },
          userDetails: {
            name: response.user.displayName,
            photo: response.user.photoURL,
            email: response.user.email,
          },
        },
      }))
      .then((response) => {
        const { authData } = response.payload;
        const { userDetails } = response.payload;

        const tokenPayload: any = {};
        tokenPayload.provider = authData.provider;
        tokenPayload.access_token = authData.accessToken;
        const payload: any = {};
        payload.authData = tokenPayload;
        payload.userDetails = userDetails;
        this.props.socialAuthentication(payload);
      })
      .catch(() => {
        this.props.displaySnackMessage('Something went wrong with the social authentication, please try again');
      });
  }

  renderSocialAuthButton = providers => (
    <React.Fragment>
      {providers.map(providersIdentity => (
        <AuthButton
          key={providersIdentity.name}
          name={providersIdentity.name}
          image={providersIdentity.image}
          provider={providersIdentity.provider}
          providerName={providersIdentity.platform}
          type={providersIdentity.type}
          handleClick={() => {
            this.getSocialAuthData(
              providersIdentity.provider,
              providersIdentity.platform,
              providersIdentity.type
            );
          }}
        />
        ))}
    </React.Fragment>
  )

  render() {
    const { providers } = this.state;
    return (
      <React.Fragment>
        {this.renderSocialAuthButton(providers)}
      </React.Fragment>
    );
  }
}

export const mapDispatchToProps = dispatch => ({
  socialAuthentication: payload => dispatch(socialAuthentication(payload)),
  displaySnackMessage: message => dispatch(displaySnackMessage(message)),
});

export default connect(null, mapDispatchToProps)(SocialAuthentication);
