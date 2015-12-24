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
      <li>
        <label className="label-checkbox item-content {itemClass}">
          <input type="checkbox" name="ks-checkbox" checked={this.props.task.checked} onChange={this.handleChecked.bind(this)} className={style.toggleChecked}/>
          <div className="item-media"><i className="icon icon-form-checkbox" /></div>
          <div className="item-inner">
            <div className="item-title {style.text}">{this.props.task.username} - {this.props.task.text} -  <button className={style.delete} onClick={this.handleDelete.bind(this)}>&times;</button> - {this.renderTogglePrivate()}</div>
          </div>
        </label>
      </li>
    );
  }
}
