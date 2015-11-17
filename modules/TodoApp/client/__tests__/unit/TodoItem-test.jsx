import TestUtils from 'react-addons-test-utils';
import TodoItem from 'TodoApp/client/components/TodoItem';
import style from 'TodoApp/client/css/TodoApp.import.css';

describe('TodoItem', () => {
  it('should display the task text and owner name', () => {
    const task = {
      text: 'Test task',
      username: 'Test Name'
    };

    const root = TestUtils.renderIntoDocument(
      <TodoItem task={task} />
    );

    const textEl = TestUtils.findRenderedDOMComponentWithClass(root, style.text);

    expect(textEl.innerText).toContain('Test Name');
    expect(textEl.innerText).toContain('Test task');
  });

  it('should cross a checked task', () => {
    const root = TestUtils.renderIntoDocument(
      <TodoItem task={{ checked: true }} />
    );

    expect(ReactDOM.findDOMNode(root).className).toContain(style.checked);
  });

  it('should highlight a private task', () => {
    const root = TestUtils.renderIntoDocument(
      <TodoItem task={{ private: true }} />
    );

    expect(ReactDOM.findDOMNode(root).className).toContain(style.private);
  });

  it('should hide the private toggle button if not the owner', () => {
    spyOn(Meteor, 'userId').and.returnValue('111');

    const root = TestUtils.renderIntoDocument(
      <TodoItem task={{ owner: '1234' }} />
    );

    const toggleEl = TestUtils.scryRenderedDOMComponentsWithClass(root, style.togglePrivate);
    expect(toggleEl.length).toEqual(0);
  });

  it('should display a "Public" button if is the owner and public', () => {
    spyOn(Meteor, 'userId').and.returnValue('111');

    const root = TestUtils.renderIntoDocument(
      <TodoItem task={{ owner: '111' }} />
    );

    const toggleEl = TestUtils.findRenderedDOMComponentWithClass(root, style.togglePrivate);
    expect(toggleEl.innerText).toBe('Public');
  });

  it('should display a "Private" button if is the owner and private', () => {
    spyOn(Meteor, 'userId').and.returnValue('111');

    const root = TestUtils.renderIntoDocument(
      <TodoItem task={{ owner: '111', private: true }} />
    );

    const toggleEl = TestUtils.findRenderedDOMComponentWithClass(root, style.togglePrivate);
    expect(toggleEl.innerText).toBe('Private');
  });

  it('should switch to public when clicking private button', () => {
    spyOn(Meteor, 'userId').and.returnValue('111');
    spyOn(Meteor, 'call');

    const root = TestUtils.renderIntoDocument(
      <TodoItem task={{ _id: '222', owner: '111', private: true }} />
    );

    const toggleEl = TestUtils.findRenderedDOMComponentWithClass(root, style.togglePrivate);
    TestUtils.Simulate.click(toggleEl);

    expect(Meteor.call).toHaveBeenCalledWith('setPrivate', '222', false);
  });

  it('should switch to private when clicking public button', () => {
    spyOn(Meteor, 'userId').and.returnValue('111');
    spyOn(Meteor, 'call');

    const root = TestUtils.renderIntoDocument(
      <TodoItem task={{ _id: '222', owner: '111' }} />
    );

    const toggleEl = TestUtils.findRenderedDOMComponentWithClass(root, style.togglePrivate);
    TestUtils.Simulate.click(toggleEl);

    expect(Meteor.call).toHaveBeenCalledWith('setPrivate', '222', true);
  });

  it('should call "deleteTask" when clicking the X button', () => {
    spyOn(Meteor, 'userId').and.returnValue('111');
    spyOn(Meteor, 'call');

    const root = TestUtils.renderIntoDocument(
      <TodoItem task={{ _id: '222', owner: '111' }} />
    );

    const deleteEl = TestUtils.findRenderedDOMComponentWithClass(root, style.delete);
    TestUtils.Simulate.click(deleteEl);

    expect(Meteor.call).toHaveBeenCalledWith('deleteTask', '222');
  });

  it('should be checked when clicking the checkbox', () => {
    spyOn(Meteor, 'userId').and.returnValue('111');
    spyOn(Meteor, 'call');

    const root = TestUtils.renderIntoDocument(
      <TodoItem task={{ _id: '222', owner: '111' }} />
    );

    const checkboxEl = ReactDOM.findDOMNode(root).querySelector('input[type="checkbox"]');
    TestUtils.Simulate.change(checkboxEl, { target: { checked: true } });

    expect(Meteor.call).toHaveBeenCalledWith('setChecked', '222', true);
  });

  it('should be unchecked when unclicking the checkbox', () => {
    spyOn(Meteor, 'userId').and.returnValue('111');
    spyOn(Meteor, 'call');

    const root = TestUtils.renderIntoDocument(
      <TodoItem task={{ _id: '222', owner: '111', checked: true }} />
    );

    const checkboxEl = ReactDOM.findDOMNode(root).querySelector('input[type="checkbox"]');
    TestUtils.Simulate.change(checkboxEl, { target: { checked: false } });

    expect(Meteor.call).toHaveBeenCalledWith('setChecked', '222', false);
  });
});
