const ACCOUNT_USERNAME = 'test-user';
const ACCOUNT_PASSWORD = 'test-password'

export function loginToTestAccount(done) {
  if (Meteor.users.find({ username: ACCOUNT_USERNAME }).count() > 0) {
    Meteor.loginWithPassword(ACCOUNT_USERNAME, ACCOUNT_PASSWORD, (err) => {
      expect(err).not.toBeDefined();
      done();
    });
  } else {
    Accounts.createUser({ username: ACCOUNT_USERNAME, password: ACCOUNT_PASSWORD }, (err) => {
      if (err.error === 403) { // already exists
        Meteor.loginWithPassword(ACCOUNT_USERNAME, ACCOUNT_PASSWORD, (err) => {
          expect(err).not.toBeDefined();
          done();
        });
        return;
      }

      expect(err).not.toBeDefined();
      done();
    });
  }
}
