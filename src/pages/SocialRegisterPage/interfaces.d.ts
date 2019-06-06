export interface SocialRegisterPageProps {
  socialAuthentication: (payload) => Promise<any>;
  displaySnackMessage: (message) => Promise<any>;
}

export interface SocialRegisterPageState {
}
