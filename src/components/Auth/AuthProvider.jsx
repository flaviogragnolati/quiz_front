import React, { useEffect } from 'react';
import { AuthContext } from 'components/Auth/AuthContext';
import { useSelector, useDispatch } from 'react-redux';
import {
  userSelector,
  authStatusSelector,
  tokenSelector,
  restoreSessionSelector,
} from 'utils/selectors';
import { restoreSession } from './authSlice';
import BackdropLoading from 'components/Loading/BackdropLoading';
import { ACTIONS } from 'store/rootReducer';

function AuthProvider({ children }) {
  const dispatch = useDispatch();

  const user = useSelector(userSelector);
  const authStatus = useSelector(authStatusSelector);
  const token = useSelector(tokenSelector);
  const restore = useSelector(restoreSessionSelector);

  //? DESLOGEO DE MULTIPLES TABS
  window.addEventListener('storage', (event) => {
    if (event.key === '__logout__') {
      dispatch(ACTIONS.auth.deleteToken());
    }
  });

  useEffect(() => {
    if (authStatus === 'idle' && !token) {
      dispatch(ACTIONS.auth.restoreToken());
    }
    if (token && !restore) {
      dispatch(restoreSession());
    }
  }, [authStatus, token, restore, dispatch]);
  return (
    <AuthContext.Provider value={user}>
      {authStatus === 'pending' && <BackdropLoading />}
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
