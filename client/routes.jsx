import { Route } from 'react-router';
import ReactRouterSSR from 'react-router-ssr';

import todoRoutes from './TodoApp/routes'

ReactRouterSSR.Run(
  <Route>
    {todoRoutes}
  </Route>
);
