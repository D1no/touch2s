require('./todo-methods');
require('./todo-subscriptions');

// Do server-rendering only in proudction mode
if (process.env.NODE_ENV === 'production') {
  require('../client/routes');
}
