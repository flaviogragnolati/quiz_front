import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useAuth } from 'components/Auth/AuthContext';

function OnlyGuestRoute({ component: Component, ...rest }) {
  const user = useAuth();
  const REDIRECT =
    Boolean(user) &&
    (user.type === 'school' ? `school-profile/${user.id}` : `/myprofile`);
  return (
    <Route
      {...rest}
      render={(props) =>
        !Boolean(user) ? <Component {...props} /> : <Redirect to={REDIRECT} />
      }
    />
  );
}

export default OnlyGuestRoute;
