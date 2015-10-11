// Methods for optimistic updates
require('../server/todo-methods');

require('./routes');

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});
