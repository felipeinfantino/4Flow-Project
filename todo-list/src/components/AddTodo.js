import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap';

export class AddTodo extends Component {
    state = {
        buttonToggled : false,
        subTasks: [
            {
                id: 1,
                title: '',
                completed: false,
            },
        ]
    }

    toggleButton = () =>{
        this.setState({buttonToggled: !this.state.buttonToggled});
    }

    addSubtask = () => {
        const defaultSubtask = {
            id: 1,
            title: '',
            completed: false,
        }
        // not working
        this.state.subTasks.push(defaultSubtask)
        this.setState({subTasks: this.state.subTasks })
    }

    render() {
        return (
            <div>
                {this.state.buttonToggled ? '': <Button variant="secondary" size="sm" onClick={this.toggleButton}>Add Todo</Button>}
                {this.state.buttonToggled ? 
                <div style={{width: '300px', margin: '0 auto', backgroundColor: 'grey', padding: '20px', borderRadius: '10px'}}>
                    <Form>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Todo</Form.Label>
                      <Form.Control type="email" placeholder="Enter todo title" />
                    </Form.Group>
                    <p>Subtasks</p>
                    {this.state.subTasks.map((subTask) => {
                        return (
                            <Form.Group controlId="formBasicEmail">
                            <Form.Control type="email" placeholder="Enter subtask" />
                            </Form.Group>
                        )
                    })}
                    <Button variant="secondary" type="submit">
                      Add subtask
                    </Button>
                    <div style={{display: 'block', marginTop: '50px'}}>
                    <Button variant="danger" type="submit">
                      Cancel
                    </Button>
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                    </div>
                  </Form>
                   </div> 
                    : ''}
            </div>
        )
    }
}

export default AddTodo
