import { Route, IndexRoute } from 'react-router';

import TodoApp from './TodoApp';
import TodoMain from './TodoMain';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import LoginScreen from './LoginScreen';

export default (
  <Route>
    <Route path="/" component={TodoApp}>
      <IndexRoute component={{
      page: TodoMain,
      leftPanel: LeftPanel,
      rightPanel: RightPanel
      }} />
    </Route>
  </Route>
);

