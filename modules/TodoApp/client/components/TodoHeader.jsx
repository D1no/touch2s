import { Component, PropTypes } from 'react';
import style from 'TodoApp/client/css/TodoApp.import.css';

export default class TodoHeader extends Component {
  static propTypes = {
    hideCompleted: PropTypes.bool,
    toggleHideCompleted: PropTypes.func.isRequired,
    incompleteCount: PropTypes.number.isRequired,
    user: PropTypes.object
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

    if (this.props.user) {
      form = (
        <li>
          <div className="item-content">
            <div className="item-inner">
              <div className="item-input">
                <form className={style.newTask} onSubmit={this.handleSubmit.bind(this)}>
                  <input type="text" name="text" placeholder="Type to add new tasks" />
                </form>
              </div>
            </div>
          </div>
        </li>
      );
    }

    return (
      <div className="list-block inset">
        <ul>
          <li>
            <div className="item-content">
              <div className="item-media"><i className="icon icon-form-name" /></div>
              <div className="item-inner">
                <div className="item-title">Hide Completed</div>
                <div className="item-after">
                  <label className="label-switch no-fastclick">
                    <input type="checkbox" checked={this.props.hideCompleted}
                           onChange={this.props.toggleHideCompleted} />
                    <div className="checkbox" />
                  </label>
                </div>
              </div>
            </div>
          </li>
            {form}
        </ul>
      </div>
    );
  }
}
