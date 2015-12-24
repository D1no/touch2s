import { Route, IndexRoute } from 'react-router';

import TodoApp from './TodoApp';
import TodoMain from './TodoMain';
import TestComponent from './TestComponent';
import Test from './test';

export default (
    <Route path="/" component={TestComponent}>
      <IndexRoute component={{content: Test}} />
    </Route>
);

