import Tasks from 'TodoApp/collections/Tasks';

// This code only runs on the server
Meteor.publish('tasks', function () {
  return Tasks.find({
    $or: [
      { private: {$ne: true} },
      { owner: this.userId }
    ]
  });
});

/* Demo Bot
 * To keep the demo exciting, we are re-add tasks. Uncomment this area in your repo
 * to not have to deal with that guy.
 */
let username = "demo";
let password = "demo";
let tasks = ["Some task", "Another task", "Some other task"];
let minTasksBeforeBot = 3;

// When there is a demo object. "meteor --settings settings.json"
// https://themeteorchef.com/snippets/making-use-of-settings-json/
if(Meteor.settings.demo && Meteor.settings.demo.username && Meteor.settings.demo.password) {
  username = Meteor.settings.demo.username;
  password = Meteor.settings.demo.password;
  tasks = Meteor.settings.demo.tasks ? Meteor.settings.demo.tasks : tasks;
}

console.log("Info: The demo bot is running. Uncomment him in server/todo-publications.js");

// Every 10 seconds, check the Tasks.count.
// If 0, re-insert some dummy tasks for demo purposes
let botAnnoyed = false;
Meteor.setInterval(function() {
  if(botAnnoyed) {
    return
  }

  const count = Tasks.find({
    $or: [
      { private: {$ne: true} }
    ]
  }).count();

  if(count > minTasksBeforeBot) {
    return
  }

  botAnnoyed = true;
  console.log("Demo: Bot is annoyed by tasks count");

  const username = Meteor.settings.demo.username;
  const password = Meteor.settings.demo.password;

  let user = Meteor.users.findOne({username: username});
  let userId;

  if(user) {
    userId = user._id;
  } else {
    console.log("Demo: Creating Account: " + username);
    userId = Accounts.createUser({username: username, password: password});
    console.log("Demo: Created with userId: " + userId);
  }

  let annoyedBot = function(afterSec, addTask, thanAfterSec, setCheck, afterSecDelete) {
    Meteor.setTimeout(() => {
      const taskInsert = Tasks.insert({
        text: addTask,
        createdAt: new Date(),
        owner: userId,
        username: username
      });
      if(thanAfterSec) {
        Meteor.setTimeout(function() {
          Tasks.update(taskInsert, { $set: { checked: setCheck} });
          if(afterSecDelete) {
            Meteor.setTimeout(function() {
              Tasks.remove(taskInsert);
            }, afterSecDelete * 1000);
          }
        }, thanAfterSec * 1000);
      }
    }, afterSec * 1000);
  };

  annoyedBot(0, "Find out: Only " + count + " task in the demo?", 2, false, 15);
  annoyedBot(3.5, "Find the guy who deleted tasks...", 10, true, 3);
  annoyedBot(5, "Fix the demo by adding some tasks", 10, true, 3);
  for (let i=0; i <= minTasksBeforeBot; i++) {
    annoyedBot(_.random(5, 15), _.sample(tasks), _.random(0, 8), _.sample([true, false]));
  }

  // Allow Re-Check after 45 Seconds.
  Meteor.setTimeout(function() {
    botAnnoyed = false;
  }, 45000);

}, 15000);
