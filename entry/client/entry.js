// Import Framework7
import "TodoApp/client/f7/less/ios/framework7.ios.less";
import "TodoApp/client/f7/less/ios/framework7.ios.colors.less";
/* Framework7 Custom Build
 * Framework7 comes with an own router and state management which would conflict with react router. So we need to excl.
 * it. Luckily we can do that very simple by doing this with the master repo:
 * https://github.com/nolimits4web/Framework7#custom-build
 * For now this one is
 * gulp custom -cards,accordion,searchbar,modals,autocomplete,progressbar,swipeout,sortable,smart-select,virtual-list,pull-to-refresh,infinite-scroll,scroll-toolbars,tabs,fast-clicks,swiper,picker,calendar,notifications,searchbar,modals,modals
 */
// add *.es5.js so the file so meteor ecmascript package ignores this (huge) file.
import "TodoApp/client/f7/js/framework7.custom.es5.js";

import "TodoApp/client/f7/less/my-app.less";

// Methods for optimistic updates
import 'TodoApp/todo-methods';

import './routes';

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});

// To activate the unit tests:
// - meteor add sanjo:jasmine
// - meteor add velocity:html-reporter
// - uncomment them on entry/client/entry.js and entry/server/entry.js

/*if (process.env.NODE_ENV !== 'production') {
  if (process.env.FRAMEWORK === 'jasmine-client-integration') {
    // Run the integration tests on the mirror
    const context = require.context('../../modules', true, /\/client\/(.*)\/integration\/(.*)\-test\.jsx?$/);
    context.keys().forEach(context);
  } else {
    // Run unit tests on client
    const context = require.context('../../modules', true, /\/client\/(.*)\/unit\/(.*)\-test\.jsx?$/);
    context.keys().forEach(context);
  }
}*/
