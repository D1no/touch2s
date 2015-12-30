import { Component, PropTypes } from 'react';
import style from 'TodoApp/client/css/TodoApp.import.css';

export default class TodoHeader extends Component {
  static propTypes = {
    hideCompleted: PropTypes.bool,
    toggleHideCompleted: PropTypes.func.isRequired,
    incompleteCount: PropTypes.number.isRequired,
    user: PropTypes.object,
    auth: PropTypes.bool
  };

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

  hideCompleted(e) {
    e.preventDefault();
    this.props.toggleHideCompleted(!this.refs["checkbox"].checked);
  }

  render() {
    let form = null;

    if (this.props.auth) {
      form = (
        <li>
          <div className="item-content">
            <div className="item-inner">
              <div className="item-input">
                <form onSubmit={this.handleSubmit.bind(this)}>
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
                <div className="item-after" onClick={this.hideCompleted.bind(this)}>
                  <label className="label-switch">
                    <input type="checkbox"
                           ref="checkbox"
                           checked={this.props.hideCompleted}
                           readOnly="true" />
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
