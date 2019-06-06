export interface SocialLoginPageProps {
  socialAuthentication: (payload) => Promise<any>;
  displaySnackMessage: (message) => Promise<any>;
}

export interface SocialLoginPageState {
}
