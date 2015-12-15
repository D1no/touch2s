import 'TodoApp/todo-methods';
import 'TodoApp/server/todo-publications';

// Do server-rendering only in proudction mode
if (process.env.NODE_ENV === 'production') {
  // Load Webpack infos for SSR
  ReactRouterSSR.LoadWebpackStats(WebpackStats);

  require('../client/routes');
} else {
  // To activate the unit tests:
  // - meteor add sanjo:jasmine
  // - meteor add velocity:html-reporter
  // - uncomment them on entry/client/entry.js and entry/server/entry.js

  // Add fixtures required for integration tests
  /*const context = require.context('../../modules', true, /\/server\/(.*)\/integration\/(.*)\-fixtures\.jsx?$/);
  context.keys().forEach(context);

  if (process.env.FRAMEWORK === 'jasmine-server-integration') {
    // Run integration tests on server
    const context = require.context('../../modules', true, /\/server\/(.*)\/integration\/(.*)\-test\.jsx?$/);
    context.keys().forEach(context);
  }*/
}
