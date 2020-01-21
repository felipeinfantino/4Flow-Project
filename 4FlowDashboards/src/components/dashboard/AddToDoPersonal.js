import React, {Component} from 'react'
import {Button, Form} from 'react-bootstrap';
import {columnNames} from '../app/App';
import DatePicker from "react-datepicker";

const uuidv4 = require('uuid/v4');

const defaultState = {
    id: uuidv4(),
    title: '',
    buttonToggled: false,
    type: 'personal',
    deadline: new Date(),
    subTasks: [
        {
            id: uuidv4(),
            title: '',
            completed: false,
        },
    ]
};

export class AddToDoPersonal extends Component {
    state = {...defaultState};

    toggleButton = () => {
        this.setState({buttonToggled: !this.state.buttonToggled});
    };

    addSubtask = () => {
        //let newId = uuidv4()
        const defaultSubtask = {
            id: uuidv4(),
            title: '',
            completed: false,
        };
        this.state.subTasks.push(defaultSubtask);
        this.setState({subTasks: this.state.subTasks})
    };

    canSaveTodo = () => {
        const hasEverySubtaskATitle = this.state.subTasks.every((subtask) => subtask.title !== '');
        const hasTodoTitle = this.state.title !== '';
        return !(hasEverySubtaskATitle && hasTodoTitle);
    };

    handleChange = (subTaskId, event) => {
        const value = event.target.value;

        this.setState({
            subTasks: this.state.subTasks.map((subTask) => {
                if (subTask.id === subTaskId) {
                    subTask.title = value;
                }
                return subTask;
            })
        })
    };

    handleTodoTitleChange = (event) => {
        const newTitle = event.target.value;
        this.setState({title: newTitle});
    };

    handleDeadlineChange = date => {
        this.setState({
            ...this.state,
            deadline: date
        });
    };

    prepareAndSubmit = () => {
        const stateCopy = {...this.state};
        delete stateCopy['buttonToggled'];
        stateCopy['status'] = columnNames.TO_DO;
        stateCopy['subTasks'] = this.state.subTasks;
        stateCopy["id"] = uuidv4();
        this.props.addTodo(stateCopy);
        this.setState({...defaultState});
    };

    render() {
        return (
            <div style={this.getStyle()}>
                {this.state.buttonToggled ? '' :
                    <Button style={{ paddingLeft: '10px' }} variant="secondary" size="sm" onClick={this.toggleButton}>+ Task</Button>
                }
                {this.state.buttonToggled ?
                    <div style={{
                        width: '300px',
                        margin: '0 auto',
                        backgroundColor: 'grey',
                        padding: '20px',
                        borderRadius: '10px'
                    }}>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Todo</Form.Label>
                                <Form.Control type="email" placeholder="Enter todo title"
                                              onChange={this.handleTodoTitleChange.bind(this)}/>
                            </Form.Group>
                            <p>Subtasks</p>
                            {this.state.subTasks.map((subTask) => {
                                return (
                                    <div key={subTask.id}>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Control type="email" placeholder="Enter subtask"
                                                          defaultValue={subTask.title}
                                                          onChange={this.handleChange.bind(this, subTask.id)}/>
                                        </Form.Group>
                                    </div>
                                )
                            })}
                            <Button className="btn btn-sm btn-dark" onClick={this.addSubtask}>
                                Add subtask
                            </Button>

                            <div style={{ margin: '20px' }}>
                                <DatePicker
                                    selected={this.state.deadline}
                                    onChange={this.handleDeadlineChange}
                                />
                            </div>

                            <div style={{display: 'block', marginTop: '20px'}}>
                                <Button style={{ marginRight: '3px' }} className="btn btn-sm btn-danger" onClick={this.toggleButton}>
                                    Cancel
                                </Button>
                                <Button style={{ marginLeft: '3px' }} className="btn btn-sm btn-success" disabled={this.canSaveTodo()} onClick={this.prepareAndSubmit}>
                                    Add
                                </Button>
                            </div>
                        </Form>
                    </div>
                    : ''}
            </div>
        )
    }

    getStyle = () => {
        return {
            margin: '30px',
        }
    }
}

export default AddToDoPersonal