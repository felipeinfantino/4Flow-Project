import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export class SubTask extends Component {
    render() {
        return (
            <div style={this.getSubTaskStyle(this.props.subTask.completed)}>
                {this.props.subTask.title}
                {this.props.subTask.completed ? <Button variant="danger" size="sm" style={{ padding: '5px', margin: '10px'}} onClick={this.props.toggleSubTask.bind(this, this.props.subTask.id, this.props.todoId)} >Undo</Button> : <Button variant="success" size="sm" style={{ padding: '5px', margin: '10px'}} onClick={this.props.toggleSubTask.bind(this, this.props.subTask.id, this.props.todoId)}>Done</Button>}
            </div>
        )
    }

    getSubTaskStyle = (completed) =>{
        return {
            padding: '10px',
            margin: '5px',
            backgroundColor: completed ? '#C8FDD3' : '#ffcccb',
            border: '1px solid black',
            borderRadius: '10px',
        }
    }
}

export default SubTask
