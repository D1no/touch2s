import TestUtils from 'react-addons-test-utils';
import TodoHeader from 'TodoApp/client/components/TodoHeader';

describe('TodoHeader', () => {
  it('should display the incomplete count', () => {
    const root = TestUtils.renderIntoDocument(
      <TodoHeader incompleteCount={123} toggleHideCompleted={() => {}} />
    );

    const header = TestUtils.findRenderedDOMComponentWithTag(root, 'h1');
    expect(header.innerText).toContain('123');
  });

  it('should toggle hide completed', done => {
    const root = TestUtils.renderIntoDocument(
      <TodoHeader incompleteCount={0} toggleHideCompleted={() => { done(); }} />
    );

    const checkbox = ReactDOM.findDOMNode(root).querySelector('[type="checkbox"]');
    TestUtils.Simulate.change(checkbox);
  });

  it('should hide the new task form if not logged in', () => {
    const root = TestUtils.renderIntoDocument(
      <TodoHeader incompleteCount={0} toggleHideCompleted={() => { done(); }} />
    );

    const forms = TestUtils.scryRenderedDOMComponentsWithTag(root, 'form');
    expect(forms.length).toEqual(0);
  });

  it('should display the new task form if logged in', () => {
    spyOn(Meteor, 'userId').and.returnValue('111');

    const root = TestUtils.renderIntoDocument(
      <TodoHeader incompleteCount={0} toggleHideCompleted={() => { done(); }} />
    );

    const forms = TestUtils.scryRenderedDOMComponentsWithTag(root, 'form');
    expect(forms.length).toEqual(1);
  });

  it('should call "addTask" when submitting the form and clear the input', () => {
    spyOn(Meteor, 'userId').and.returnValue('111');
    spyOn(Meteor, 'call').and.returnValue();

    const root = TestUtils.renderIntoDocument(
      <TodoHeader incompleteCount={0} toggleHideCompleted={() => { done(); }} />
    );

    const task = 'This is a task example';
    const target = { text: { value: task } };
    const formEl = TestUtils.findRenderedDOMComponentWithTag(root, 'form');

    TestUtils.Simulate.submit(formEl, { target });

    expect(Meteor.call).toHaveBeenCalledWith('addTask', task);
    expect(target.text.value).toBe('');
  });
});
