import { Route } from 'react-router';
import ReactRouterSSR from 'react-router-ssr';

import todoRoutes from 'todo/client/routes'

ReactRouterSSR.Run(
  <Route>
    {todoRoutes}
  </Route>
);
