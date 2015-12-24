import { Component, PropTypes } from 'react';
import style from 'TodoApp/client/css/TodoApp.import.css';

const LoginButtons = BlazeToReact('loginButtons');

export default class TodoHeader extends Component {
  static propTypes = {
    hideCompleted: PropTypes.bool,
    toggleHideCompleted: PropTypes.func.isRequired,
    incompleteCount: PropTypes.number.isRequired
  }

  handleSubmit(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    var text = event.target.text.value;

    // Insert a task into the collection
    Meteor.call('addTask', text);

    // Clear form
    event.target.text.value = '';
  }

  render() {
    let form = null;

    if (Meteor.userId()) {
      form = (
        <div className="item-content">
          <div className="item-media"><i className="icon icon-form-name" /></div>
          <div className="item-inner">
            <div className="item-title label">New Task</div>
            <div className="item-input">
              <form className={style.newTask} onSubmit={this.handleSubmit.bind(this)}>
                <input type="text" name="text" placeholder="Type to add new tasks" />
              </form>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="list-block">
        <ul>
          <li>
            <div className="item-content">
              <LoginButtons />
            </div>

          </li>
          <li>
            <div className="item-content">
              <div className="item-media"><i className="icon icon-form-toggle" /></div>
              <div className="item-inner">
                <div className="item-title label">Hide Completed Tasks</div>
                <div className="item-input">
                  <label className="label-switch">
                    <input type="checkbox" checked={this.props.hideCompleted} onChange={this.props.toggleHideCompleted} />
                    <div className="checkbox" />
                  </label>
                </div>
              </div>
            </div>
          </li>
          <li>
            {form}
          </li>
        </ul>
      </div>
    );
  }
}
