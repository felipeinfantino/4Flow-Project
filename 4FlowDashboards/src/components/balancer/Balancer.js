import React from 'react';
import Todos from '../dashboard/Todos';
import 'bootstrap/dist/css/bootstrap.min.css';

const uuidv4 = require('uuid/v4');

export const columnNames = {
    WAITING: 'Waiting',
    IN_REVIEW: 'In Review',
    DONE: 'Done',
};

class Balancer extends React.Component {

    state = {
        todos: [
            {
                id: uuidv4(),
                title: 'Deliver Equipment Berlin - Hamburg',
                status: columnNames.WAITING,
                subTasks: [
                    {
                        id: uuidv4(),
                        title: 'Coordinate transport',
                        completed: false,
                    },
                    {
                        id: uuidv4(),
                        title: 'Coordinate supplier',
                        completed: false,
                    },
                    {
                        id: uuidv4(),
                        title: 'Coordinate with company manager',
                        completed: false,
                    },
                ]
            },
        ],
        newTodoTitle: '',
        statusOrder: [columnNames.WAITING, columnNames.IN_REVIEW, columnNames.DONE],
    };


    deleteItem = (id) => {
        const elem = this.state.todos.find((todo) => todo.id === id);
        const index = this.state.todos.indexOf(elem);
        this.state.todos.splice(index, 1);
        this.setState({todos: this.state.todos});
    };

    getNextState = (status) => {
        const currentIndex = this.state.statusOrder.indexOf(status);
        return this.state.statusOrder[currentIndex + 1]; // UI is preventing overflow, the display buttons take care of this
    };

    getPreviousState = (status) => {
        const currentIndex = this.state.statusOrder.indexOf(status);
        return this.state.statusOrder[currentIndex - 1]; // UI is preventing overflow, the display buttons take care of this
    };

    // shiftLeft is a boolean, if true shiftLeft if false shiftRight
    shiftItem = (id, shiftLeft) => {
        this.setState({
            todos: this.state.todos.map((todo) => {
                if (todo.id === id) {
                    let newStatus;
                    if (shiftLeft) {
                        newStatus = this.getNextState(todo.status);
                    } else {
                        newStatus = this.getPreviousState(todo.status);
                    }
                    todo.status = newStatus;
                }
                return todo;
            })
        });
        console.log(id);
        console.log(shiftLeft);
    };

    addTodo = (todo) => {
        this.state.todos.push(todo);
        this.setState({todos: this.state.todos});

    };

    canAddTodo = () => {
        return this.state.newTodoTitle === '';
    };

    setNewTitle = (e) => {
        this.setState({newTodoTitle: e.target.value})
    };

    setTodoStateIfNeeded = (todo) => {
        // the idea is to shift to right and left Todos under certain conditions
        switch (todo.status) {
            case columnNames.WAITING:
                const existsNotCompletedSubTask = todo.subTasks.find((subTask) => subTask.completed === false);
                if (existsNotCompletedSubTask) {
                    todo.status = columnNames.IN_REVIEW;
                    break;
                }
                break;
            case columnNames.IN_REVIEW:
                const allCompleted = todo.subTasks.every((subTask) => subTask.completed === true);
                if (allCompleted) {
                    todo.status = columnNames.DONE;
                }
                break;
            default:
                break;
            // code block
        }
    };

    toggleSubTask = (subTaskId, todoId) => {
        this.setState({
            todos: this.state.todos.map((todo) => {
                if (todo.id === todoId) {
                    todo.subTasks.map((subTask) => {
                        if (subTask.id === subTaskId) {
                            subTask.completed = !subTask.completed;
                        }
                        return subTask; // we dont actually need to return it, but in order to get rid of the warning
                    });
                    this.setTodoStateIfNeeded(todo);
                }
                return todo;
            })
        })
    };

    render() {
        return (
            <div>
                <div style={{display: 'flex'}}>
                    {Object.keys(columnNames).map((state) => {
                        return (
                            <div key={state} style={{width: '25vw'}}>
                                <h5 style={{
                                    backgroundColor: '#F8F8F8',
                                    border: '1px solid black',
                                    borderRadius: '5px',
                                    margin: '15px',
                                    padding: '10px',
                                    fontStyle: 'bold'
                                }}>{columnNames[state]}</h5>
                                <Todos todos={this.state.todos.filter((todo) => todo.status === columnNames[state])}
                                       deleteItem={this.deleteItem}
                                       shiftItem={this.shiftItem}
                                       toggleSubTask={this.toggleSubTask}
                                />
                            </div>
                        )
                    })}
                </div>

            </div>
        );
    }
}

export default Balancer;