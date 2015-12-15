import React from 'react';
import TodoList from 'TodoApp/client/components/TodoList';
import TodoItem from 'TodoApp/client/components/TodoItem';

const TestUtils = React.addons.TestUtils;

describe('TodoList', () => {
  it('should display tasks', () => {
    const tasks = [
      { text: 'test1' },
      { text: 'test2' },
      { text: 'test3' },
      { text: 'test4' },
      { text: 'test5' }
    ];

    const root = TestUtils.renderIntoDocument(
      <TodoList tasks={tasks} />
    );

    const items = TestUtils.scryRenderedComponentsWithType(root, TodoItem);
    expect(items.length).toEqual(5);
  });
});
