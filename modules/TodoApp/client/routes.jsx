import { Route, IndexRoute } from 'react-router';

import TodoApp from './TodoApp';
import TodoMain from './TodoMain';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';

export default (
  <Route>
    <Route path="/" component={TodoApp}>
      <IndexRoute component={TodoMain} />
    </Route>
  </Route>
);

