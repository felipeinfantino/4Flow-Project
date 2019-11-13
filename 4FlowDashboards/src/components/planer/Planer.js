import React from 'react';
import Todos from '../dashboard/Todos';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddTodo from '../dashboard/AddTodo';

const uuidv4 = require('uuid/v4');
document.body.style = 'background: black;';

export const columnNames = {
    TO_DO: 'To do',
    IN_PROGRESS: 'In progress',
    WAITING: 'Waiting',
    DONE: 'Done',
};

class Planer extends React.Component {

    state = {
        todos: [
            {
                id: uuidv4(),
                title: 'Deliver Equipment Berlin - Hamburg',
                status: columnNames.TO_DO,
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
        statusOrder: [columnNames.TO_DO, columnNames.IN_PROGRESS, columnNames.WAITING, columnNames.DONE],
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
            case columnNames.TO_DO:
                // if there is at least one subTask completed and at least one task not completed, the state should change
                const existCompletedSubTask = todo.subTasks.find((subTask) => subTask.completed === true);
                const existNotCompletedSubTask = todo.subTasks.find((subTask) => subTask.completed === true);
                if (existCompletedSubTask && existNotCompletedSubTask) {
                    todo.status = columnNames.IN_PROGRESS;
                }
                break;
            case columnNames.IN_PROGRESS:
                // if all subTasks are not Completed the Todo should go to TO_DO
                const allUncompleted = todo.subTasks.every((subTask) => subTask.completed === false);
                if (allUncompleted) {
                    todo.status = columnNames.TO_DO;
                    break;
                }
                // if all subTasks are completed the todo should go to WAITING , where the balancer should approve or not
                const allCompleted = todo.subTasks.every((subTask) => subTask.completed === true);
                if (allCompleted) {
                    todo.status = columnNames.WAITING;
                }
                break;
            case columnNames.WAITING:
                // this a state where the balancer should review the route. If the planer did a mistake and wants to undo, he shold be able to do it
                const existsNotCompletedSubTask = todo.subTasks.find((subTask) => subTask.completed === true);
                if (existsNotCompletedSubTask) {
                    todo.status = columnNames.IN_PROGRESS;
                    break;
                }
                break;
            case columnNames.DONE:
                // when the balancer approves the route the todos come to this state
                break;
            default:
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
                <AddTodo addTodo={this.addTodo}/>
                <div style={this.getStyle()}>
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


    getStyle = () => {
        return {
            display: 'flex',
        }
    }
}

export default Planer;