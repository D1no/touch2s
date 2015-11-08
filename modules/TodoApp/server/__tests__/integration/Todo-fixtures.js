import Tasks from 'TodoApp/collections/Tasks';

Meteor.methods({
  'fixtures/cleanTodo': () => {
    Tasks.remove({});
  }
});
