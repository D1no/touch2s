import { Route, IndexRoute } from 'react-router';

import TodoApp from './TodoApp';
import TodoMain from './TodoMain';

export default (
  <Route path="/" component={TodoApp}>
    <IndexRoute component={TodoMain} />
  </Route>
);
