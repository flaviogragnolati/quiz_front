import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useAuth } from 'components/Auth/AuthContext';

function TeacherRoute({ component: Component, ...rest }) {
  const user = useAuth();
  const REDIRECT = '/home';
  return (
    <Route
      {...rest}
      render={(props) =>
        Boolean(user) && user.type === 'teacher' ? (
          <Component {...props} />
        ) : (
          <Redirect to={REDIRECT} />
        )
      }
    />
  );
}

export default TeacherRoute;
