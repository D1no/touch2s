import { Route, IndexRoute } from 'react-router';

import TodoApp from './index';
import TodoMain from './TodoMain';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';

export default (
  <Route>
    <Route path="/" component={TodoApp}>
      <IndexRoute component={TodoMain} />
    </Route>
  </Route>
);

