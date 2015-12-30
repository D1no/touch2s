import { Component } from 'react';
import ReactMixin from 'react-mixin';

import TodoHeader from './components/TodoHeader';
import TodoList from './components/TodoList';

import Tasks from 'TodoApp/collections/Tasks';
import style from './css/TodoApp.import.css';

// Thanks to TrackerReact all our reactive meteor calls render also reactively in react (i.e. user())
@ReactMixin.decorate(TrackerReact)
export default class TodoMain extends Component {

  constructor(props, context) {
    super(props);
    this.state = {
      subscription: {
        tasks: Meteor.subscribe('tasks')
      },
      hideCompleted: false
    }
  }

  componentWillUnmount() {
    this.state.subscription.tasks.stop();
  }

  user() {
    // Meteor.userId is also available on the server via a cookie thanks to fast-render
    let userId = Meteor.userId();

    if (userId) {
      // But to SSR user info (i.e. username), we can not get the user object via Meteor.user() on the Server
      // (a reactive data source), so we query the user object via the collection handler (not reactive).
      if (Meteor.isServer) {
        return Meteor.users._collection.findOne({_id: userId});
      }
      return Meteor.user();

    } else {
      return false;
    }
  }

  tasks() {
    let taskFilter = {};

    if (this.state.hideCompleted) {
      taskFilter.checked = {$ne: true};
    }

    return Tasks.find(taskFilter, {sort: {createdAt: -1}}).fetch();
  }

  incompleteCount() {
    let count = Tasks.find({checked: {$ne: true}}).count();

    return count;
  }

  handleToggleHideCompleted(checked) {
    this.setState({hideCompleted: checked});
  }

  render() {

    let content = null;
    if (!Meteor.isServer && !this.state.subscription.tasks.ready()) {
      // loading
      content = (
        <div className="content-block" style={{textAlign: "center"}}>
          <span style={{width:"42px", height:"42px"}} className="preloader"/>
        </div>
      );
    } else {
      content = (
        <TodoList tasks={this.tasks()} user={this.user()}/>
      )
    }

    return (
      <div className="page-content">
        <TodoHeader
          incompleteCount={this.incompleteCount()}
          hideCompleted={this.state.hideCompleted}
          toggleHideCompleted={this.handleToggleHideCompleted.bind(this)}
          user={this.user()}
        />
        <div className="content-block-title">
          {"Todo's " + (this.user() ? "(" + this.user().username + ") " : "") }
          <span className="badge">{this.incompleteCount()}</span>
        </div>
        {content}
        <div className="content-block-title">Example Pages</div>
        <div className="list-block">
          <ul>
            <li><a href="#about" className="item-link ajax">
              <div className="item-content">
                <div className="item-inner">
                  <div className="item-title">Example About Page</div>
                </div>
              </div>
            </a></li>
            <li><a href="#form" className="item-link ajax">
              <div className="item-content">
                <div className="item-inner">
                  <div className="item-title">Form Elements</div>
                </div>
              </div>
            </a></li>
          </ul>
        </div>
      </div>
    );
  }
};
