import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useAuth } from 'components/Auth/AuthContext';

function SchoolRoute({ component: Component, ...rest }) {
  const user = useAuth();
  const REDIRECT = '/home';
  return (
    <Route
      {...rest}
      render={(props) =>
        Boolean(user) && user.type === 'school' ? (
          <Component {...props} />
        ) : (
          <Redirect to={REDIRECT} />
        )
      }
    />
  );
}

export default SchoolRoute;
