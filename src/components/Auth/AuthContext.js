import { createContext, useContext } from 'react';

export const AuthContext = createContext();

export const useAuth = () => {
  const user = useContext(AuthContext);
  if (user === undefined) {
    throw new Error(
      `user es UNDEFINED.
      1. useAuthState fuera de scope, tenes que llamarla dentro del provider;
      2. El objeto user pasado al contexto (desde redux) no esta definido.`
    );
  }
  if (Object.keys(user).length === 0 && user.constructor === Object) {
    return null;
  }

  return user;
};
