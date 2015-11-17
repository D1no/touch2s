import { Component, PropTypes } from 'react';
import style from 'TodoApp/client/css/TodoApp.import.css';

export default class TodoItem extends Component {
  static propTypes = {
    task: PropTypes.object.isRequired
  }

  handleChecked(e) {
    // Set the checked property to the opposite of its current value
    Meteor.call('setChecked', this.props.task._id, e.target.checked);
  }

  handleDelete() {
    Meteor.call('deleteTask', this.props.task._id);
  }

  handleSetPrivate() {
    Meteor.call('setPrivate', this.props.task._id, !this.props.task.private);
  }

  renderTogglePrivate() {
    if (Meteor.userId() !== this.props.task.owner) {
      return null;
    }

    return (
      <button className={style.togglePrivate} onClick={this.handleSetPrivate.bind(this)}>
        {this.props.task.private ? 'Private' : 'Public'}
      </button>
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
      <li className={itemClass}>
        <button className={style.delete} onClick={this.handleDelete.bind(this)}>&times;</button>
        <input type="checkbox" checked={this.props.task.checked} onChange={this.handleChecked.bind(this)} className={style.toggleChecked} />
        {this.renderTogglePrivate()}
        <span className={style.text}><strong>{this.props.task.username}</strong> - {this.props.task.text}</span>
      </li>
    );
  }
}
