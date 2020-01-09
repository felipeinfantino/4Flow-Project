import React, {Component} from 'react'
import {Button, Form, DropdownButton, Dropdown} from 'react-bootstrap';
import {columnNames} from '../app/App';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const uuidv4 = require('uuid/v4');

const defaultState = {
    id: uuidv4(),
    title: '',
    buttonToggled: false,
    buttonTitle: 'Select Set',
    deadline: new Date(),
    subTasks: [
        {
            id: uuidv4(),
            title: '',
            completed: false,
        },
    ]
};

export class AddTodo extends Component {
    state = {...defaultState};

    toggleButton = () => {
        this.setState({buttonToggled: !this.state.buttonToggled});
    };

    addSubtask = () => {
        const defaultSubtask = {
            id: uuidv4(),
            title: '',
            completed: false,
        };
        this.state.subTasks.push(defaultSubtask);
        this.setState({subTasks: this.state.subTasks})
    };

    canSaveTodo = () => {
        //const hasEverySubtaskATitle = this.state.subTasks.every((subtask) => subtask.title !== '');
        const setSelected = this.state.buttonTitle !== 'Select Set'
        const hasTodoTitle = this.state.title !== '';
        return !(hasTodoTitle) || !(setSelected);
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

    handleDeadlineChange = date => {
        this.setState({
            ...this.state,
            deadline: date
        });
    };

    handleTodoTitleChange = (event) => {
        const newTitle = event.target.value;
        this.setState({title: newTitle});
    };

    setFactory = (setType) => {
        if(setType == "Set1"){
            return( [          {
                id: uuidv4(),
                title: 'Subtask A',
                completed: false,
            },
            {
                id: uuidv4(),
                title: 'Subtask B',
                completed: false,
            } ])
        }
        if(setType == "Set2"){
            return(          [ {
                id: uuidv4(),
                title: 'Subtask C',
                completed: false,
            },
            {
                id: uuidv4(),
                title: 'Subtask D',
                completed: false,
            }])

        }
        if(setType == "Set3"){
            return( [          {
                id: uuidv4(),
                title: 'Subtask E',
                completed: false,
            },
            {
                id: uuidv4(),
                title: 'Subtask F',
                completed: false,
            }])

        }
    }

    prepareAndSubmit = () => {
        const stateCopy = {...this.state};
        delete stateCopy['buttonToggled'];
        stateCopy['status'] = columnNames.TO_DO;
        // stateCopy['subTasks'] = [
        //     {
        //         id: uuidv4(),
        //         title: 'Collect Data & Communication',
        //         completed: false,
        //     },
        //     {
        //         id: uuidv4(),
        //         title: 'Change Master Data',
        //         completed: false,
        //     },
        //     {
        //         id: uuidv4(),
        //         title: 'Create Route',
        //         completed: false,
        //     },
        //     {
        //         id: uuidv4(),
        //         title: 'Create and send routing instructions',
        //         completed: false,
        //     },
        // ]
        stateCopy['subTasks'] = this.setFactory(this.state.buttonTitle)
        this.props.addTodo(stateCopy);
        this.setState({...defaultState});
    };

    selectSet = (e, object) => {
        console.log(e)
        console.log(object)
        this.setState({buttonTitle: e})

    }

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
                            <DropdownButton id="dropdown-basic-button" title={this.state.buttonTitle} className="dropdown-sets" style={{marginBottom: '10px'}} onSelect={this.selectSet} >
                                <Dropdown.Item eventKey="Set1">Set 1</Dropdown.Item>
                                <Dropdown.Item eventKey="Set2">Set 2</Dropdown.Item>
                                <Dropdown.Item eventKey="Set3">Set 3</Dropdown.Item>
                            </DropdownButton>

                            <DatePicker
                                selected={this.state.deadline}
                                onChange={this.handleDeadlineChange}
                            />

                            <Button style={{ marginLeft: '10px' }} className="btn btn-sm btn-success" disabled={this.canSaveTodo()} onClick={this.prepareAndSubmit}>
                                Add
                            </Button>
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

export default AddTodo
