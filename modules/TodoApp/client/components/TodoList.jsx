import { Component, PropTypes } from 'react';
import TodoItem from './TodoItem';

export default class TodoList extends Component {
  static propTypes = {
    tasks: PropTypes.array.isRequired,
    user: PropTypes.object
  }

  render() {
    return (
      <div className="list-block">
        <ul>
          {this.props.tasks.map(task => <TodoItem key={task._id} task={task} user={this.props.user} />)}
        </ul>
      </div>
    );
  }
}
