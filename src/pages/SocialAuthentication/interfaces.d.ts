export interface SocialAuthenticationProps {
  socialAuthentication: (payload) => Promise<any>;
  displaySnackMessage: (message) => Promise<any>;
}

export interface SocialAuthenticationState {
  providers: any;
}
