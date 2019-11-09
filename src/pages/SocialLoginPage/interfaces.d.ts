export interface SocialLoginPageProps {
  socialAuthentication: (payload) => Promise<any>;
  displaySnackMessage: (message) => Promise<any>;
  history: {push : (url: string) => void;};
}

export interface SocialLoginPageState {
}
