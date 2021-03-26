import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useAuth } from 'components/Auth/AuthContext';

function AdminRoute({ component: Component, ...rest }) {
  const user = useAuth();
  //!falta agregar la verificacion del admin contra la DB
  const REDIRECT = '/home';
  return (
    <Route
      {...rest}
      render={(props) =>
        Boolean(user) && user.type === 'admin' ? (
          <Component {...props} />
        ) : (
          <Redirect to={REDIRECT} />
        )
      }
    />
  );
}

export default AdminRoute;
