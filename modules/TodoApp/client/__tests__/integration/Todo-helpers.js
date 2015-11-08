
export function loginToTestAccount(done) {
  if (Meteor.users.findOne({ username: 'test-user' })) {
    Meteor.loginWithPassword('test-user', 'test-password', done);
  } else {
    Accounts.createUser({ username: 'test-user', password: 'test-password' }, done)
  }
}
