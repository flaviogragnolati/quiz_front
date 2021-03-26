import React from 'react';
import { routes, createRoutes } from './routes';

function AppRoutes() {
  return <>{createRoutes(routes)}</>;
}

export default AppRoutes;
