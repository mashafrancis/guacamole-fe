// react library
import * as React from 'react';

// third party libraries
import { Redirect, Route } from 'react-router';

// interfaces
import { RestrictedRouteProps } from 'components/RestrictedRoute/interface';

// helpers
import authorize from 'utils/helpers/authorize';

const RestrictedRoute: React.SFC<RestrictedRouteProps> = (props) => {
  if (!props.authorize || authorize(props.authorize, { strict: props.strict })) {
    return (
      <Route { ...props } />
    );
  }

  if (props.fallbackView) {
    return props.fallbackView;
  }

  return (
    <Redirect to={props.redirectTo} />
  );
};

RestrictedRoute.defaultProps = {
  redirectTo: '/',
  strict: true,
};

export default RestrictedRoute;
