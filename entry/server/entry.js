import 'TodoApp/todo-methods';
import 'TodoApp/server/todo-subscriptions'

// Do server-rendering only in proudction mode
if (process.env.NODE_ENV === 'production') {
  // Load Webpack infos for SSR
  ReactRouterSSR.LoadWebpackStats(WebpackStats);

  require('../client/routes');
} else {
  if (process.env.FRAMEWORK === 'jasmine-client-integration') {
    // Add fixtures required for integration tests
    const context = require.context('../../modules', true, /\/server\/(.*)\/integration\/(.*)\-fixtures\.jsx?$/);
    context.keys().forEach(context);
  } else {
    // Run unit tests on server
    const context = require.context('../../modules', true, /\/server\/(.*)\/unit\/(.*)\-test\.jsx?$/);
    context.keys().forEach(context);
  }
}
