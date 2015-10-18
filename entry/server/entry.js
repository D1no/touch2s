// Polyfill ES6 for Node.js because Meteor doesn't use last version
import 'babel/polyfill';

import 'TodoApp/todo-methods';
import 'TodoApp/server/todo-subscriptions'

// Do server-rendering only in proudction mode
if (process.env.NODE_ENV === 'production') {
  // Load Webpack infos for SSR
  ReactRouterSSR.LoadWebpackStats(WebpackStats);

  require('../client/routes');
}
