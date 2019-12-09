import React, {Component} from 'react'
import SubTask from './SubTask';

export class SubTaskList extends Component {
    render() {
        return this.props.subTasks.map((subTask) => <SubTask subTask={subTask} key={subTask.id}
                                                             toggleSubTask={this.props.toggleSubTask}
                                                             todoId={this.props.todoId}
                                                             history={this.props.history}
                                                             />)
    }
}

export default SubTaskList
