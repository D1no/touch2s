import { Component, PropTypes } from 'react';
import style from 'TodoApp/client/css/TodoApp.import.css';

export default class TodoItem extends Component {
  static propTypes = {
    task: PropTypes.object.isRequired
  }

  handleChecked(e) {
    // Prevent default otherwise click would fire twice due to fast-click & react acting on it
    e.preventDefault();
    // Can not use e.target.checked because iOS does not fire onChange events
    // on input fields inside of labels when fast-click is in use. So we use a ref.
    // Set the checked property to the opposite of its current value
    // https://facebook.github.io/react/docs/forms.html#potential-issues-with-checkboxes-and-radio-buttons
    Meteor.call('setChecked', this.props.task._id, !this.refs["checkbox"].checked);
  }

  handleDelete(e) {
    // Prevent default otherwise click would fire twice due to fast-click & react
    e.preventDefault();
    Meteor.call('deleteTask', this.props.task._id);
  }

  handleSetPrivate(e) {
    // Prevent default otherwise click would fire twice due to fast-click & react
    e.preventDefault();
    Meteor.call('setPrivate', this.props.task._id, !this.props.task.private);
  }

  renderTogglePrivate() {
    if (Meteor.userId() !== this.props.task.owner) {
      return null;
    }

    return (
      <a href="#" className="bg-blue" style={{}} onClick={this.handleSetPrivate.bind(this)}>{this.props.task.private ? 'Make Public' : 'Make Private'}</a>
    );
  }

  render() {
    let itemClass = '';

    if (this.props.task.checked) {
      itemClass += style.checked;
    }

    if (this.props.task.private) {
      itemClass += ' ' + style.private;
    }

    return (
      <li className="swipeout" >
        <div className="swipeout-content item-content" onClick={this.handleChecked.bind(this)} style={{paddingLeft: "0px"}}>
          <label className={"label-checkbox item-content " + (this.props.task.private ? style.togglePrivate : '')}
                 style={{width: "100%", paddingLeft: "20px"} }>
            <input type="checkbox" name="task-checkbox"
                   ref="checkbox"
                   checked={this.props.task.checked}
                   readOnly="true"
                   className={style.toggleChecked} />
            <div className="item-media"><i className="icon icon-form-checkbox" /></div>
            <div className="item-inner">
              <div className="item-title">{this.props.task.text}</div>
              <div className="item-after">{this.props.task.username}</div>
            </div>
          </label>
        </div>
        <div className="swipeout-actions-right">
          {this.renderTogglePrivate()}
          <a href="#" className="swipeout-delete" style={{}} onClick={this.handleDelete.bind(this)}>Delete</a>
        </div>
      </li>
    );
  }
}
