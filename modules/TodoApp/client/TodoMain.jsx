import { Component } from 'react';
import ReactMixin from 'react-mixin';

import TodoHeader from './components/TodoHeader';
import TodoList from './components/TodoList';

import Tasks from 'TodoApp/collections/Tasks';
import style from './css/TodoApp.import.css'


@ReactMixin.decorate(TrackerReact)
export default class TodoMain extends Component {

  static defaultProps = {
    subscription: Meteor.subscribe('tasks')
  }

  constructor(props, context) {
    super(props);
    this.state = {
      hideCompleted: false
    }
  }

  componentWillUnmount() {
    this.props.subscription.stop();
  }

  user() {
    return Meteor.user()
  }

  tasks() {
    let taskFilter = {};

    if (this.state.hideCompleted) {
      taskFilter.checked = {$ne: true};
    }

    return Tasks.find(taskFilter, {sort: {createdAt: -1}}).fetch();
  }

  incompleteCount() {
    return Tasks.find({checked: {$ne: true}}).count();
  }

  handleToggleHideCompleted = (e) => {
    this.setState({ hideCompleted: e.target.checked });
  }

  render() {
    if (!this.props.subscription.ready()) {
      // loading
      return (
        <div className={style.container}>
          <h1>Loading...</h1>
        </div>
      );
    }

    return (
        <div className={style.container}>
          <TodoHeader
              incompleteCount={this.incompleteCount()}
              hideCompleted={this.state.hideCompleted}
              toggleHideCompleted={this.handleToggleHideCompleted}
          />
          <TodoList tasks={this.tasks()} />
        </div>
    );
  }
};
