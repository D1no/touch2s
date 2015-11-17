import TestUtils from 'react-addons-test-utils';
import * as userHelpers from 'TestHelpers/client/user';
import * as domHelpers from 'TestHelpers/client/dom';
import style from 'TodoApp/client/css/TodoApp.import.css';

describe('Todo', () => {
  beforeEach(done => {
    userHelpers.loginToTestAccount(() => {
      Meteor.call('fixtures/cleanTodo', () => {
        done();
      });
    });
  });

  afterEach(done => {
    Meteor.logout(() => {
      done();
    });
  });

  it('should list tasks by reverse creation order', done => {
    const testText1 = 'My first task';
    const testText2 = 'My second task';

    const formEl = $('form');
    expect(formEl.length).toEqual(1);

    formEl[0].text.value = testText1;
    TestUtils.Simulate.submit(formEl[0], { target: formEl[0] });

    domHelpers.waitsFor('li', 1, taskEl => {
      expect(formEl[0].text.value).toEqual('');
      expect(taskEl.find(`.${style.text}`).text()).toEqual('test-user - ' + testText1);

      formEl[0].text.value = testText2;
      TestUtils.Simulate.submit(formEl[0], { target: formEl[0] });

      domHelpers.waitsFor('li', 2, taskEl2 => {
        expect(formEl[0].text.value).toEqual('');
        expect(taskEl2.first().find(`.${style.text}`).text()).toEqual('test-user - ' + testText2);
        done();
      })
    });
  });

  it('should remove a task by clicking X', done => {
    const testText = 'My first task';

    const formEl = $('form');
    expect(formEl.length).toEqual(1);

    formEl[0].text.value = testText;
    TestUtils.Simulate.submit(formEl[0], { target: formEl[0] });

    domHelpers.waitsFor('li', 1, taskEl => {
      TestUtils.Simulate.click(taskEl.find(`.${style.delete}`)[0]);
      domHelpers.waitsFor('li', 0, done);
    });
  });

  it('should not display private tasks of others', done => {
    Meteor.call('fixtures/createPrivateTask', () => {
      domHelpers.waitsFor('li', 1, done);
    });
  });

  it('should be able to toggle your task private and public', done => {
    const testText = 'My first task';

    const formEl = $('form');
    expect(formEl.length).toEqual(1);

    formEl[0].text.value = testText;
    TestUtils.Simulate.submit(formEl[0], { target: formEl[0] });

    domHelpers.waitsFor('li', 1, taskEl => {
      const toggleEl = taskEl.find(`.${style.togglePrivate}`);
      expect(toggleEl.text()).toEqual('Public');
      TestUtils.Simulate.click(toggleEl[0]);

      domHelpers.waitsFor('li button:contains(Private)', 1, () => {
        TestUtils.Simulate.click(toggleEl[0]);
        domHelpers.waitsFor('li button:contains(Public)', 1, done);
      });
    });
  });
});
//
