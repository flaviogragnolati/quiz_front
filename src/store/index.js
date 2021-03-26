import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import rootReducer from './rootReducer';
import notificationMiddleware from './notificationMiddleware';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(notificationMiddleware).concat(logger),
  // getDefaultMiddleware().concat\(logger),
});

export default store;
