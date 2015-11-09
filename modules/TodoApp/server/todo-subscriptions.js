import Tasks from 'TodoApp/collections/Tasks';

// This code only runs on the server
Meteor.publish('tasks', function () {
  //this.ready();

  return Tasks.find({
    $or: [
      { private: {$ne: true} },
      { owner: this.userId }
    ]
  });
});
