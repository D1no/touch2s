import { Component } from 'react';
import ReactMixin from 'react-mixin';

import TodoHeader from './components/TodoHeader';
import TodoList from './components/TodoList';

import Tasks from 'TodoApp/collections/Tasks';
import style from './css/TodoApp.import.css';

@ReactMixin.decorate(TrackerReact)
export default class TodoMain extends Component {

  static defaultProps = {
    subscription: Meteor.isClient ? Meteor.subscribe('tasks') : {ready() {return true} }
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
    let count = Tasks.find({checked: {$ne: true}}).count();

    if(Meteor.isServer) {
      console.dir(Tasks.find().fetch());
      console.log(count);
    }

    return count;
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
        <div className="page-content">
          <TodoHeader
              incompleteCount={this.incompleteCount()}
              hideCompleted={this.state.hideCompleted}
              toggleHideCompleted={this.handleToggleHideCompleted}
          />
          <div className="content-block-title">Todo List ({this.incompleteCount()})</div>
          <TodoList tasks={this.tasks()} />
          <div className="content-block-title">What about simple navigation?</div>
          <div className="list-block">
            <ul>
              <li><a href="#about" className="item-link">
                <div className="item-content">
                  <div className="item-inner">
                    <div className="item-title">About</div>
                  </div>
                </div></a></li>
              <li><a href="#services" className="item-link">
                <div className="item-content">
                  <div className="item-inner">
                    <div className="item-title">Services</div>
                  </div>
                </div></a></li>
              <li><a href="#form" className="item-link">
                <div className="item-content">
                  <div className="item-inner">
                    <div className="item-title">Form</div>
                  </div>
                </div></a></li>
            </ul>
          </div>
          <div className="content-block-title">Side panels</div>
          <div className="content-block">
            <div className="row">
              <div className="col-50"><a href="#" data-panel="left" className="button open-panel">Left Panel</a></div>
              <div className="col-50"><a href="#" data-panel="right" className="button open-panel">Right Panel</a></div>
            </div>
          </div>
        </div>
    );
  }
};
