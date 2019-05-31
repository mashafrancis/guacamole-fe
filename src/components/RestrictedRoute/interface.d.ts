import { RouteProps } from 'react-router';

export interface RestrictedRouteProps extends RouteProps {
  authorize?: string | string[];
  redirectTo?: string;
  strict?: boolean;
  fallbackView?: React.ReactSFC;
}
