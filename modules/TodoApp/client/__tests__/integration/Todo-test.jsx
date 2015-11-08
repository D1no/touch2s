import * as helpers from './Todo-helpers';

describe('Todo', () => {
  beforeEach(done => {
    helpers.loginToTestAccount(() => {
      Meteor.call('fixtures/cleanTodo');
      done();
    });
  });

  afterEach(done => {
    Meteor.logout(done);
  });

  it('should list tasks by creation time', () => {
    // TODO
  });

  it('should remove a task by clicking X', () => {
    // TODO
  });

  it('should not display private tasks of others', () => {
    // TODO
  });

  it('should be able to toggle your task private', () => {
    // TODO
  });

  it('should be able to toggle a private task public', () => {
    // TODO
  });
});
