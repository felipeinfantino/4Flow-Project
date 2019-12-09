import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import createHistory from 'history/createBrowserHistory'


export class SubTask extends Component {

 
    startTask = (subtaskId, todoId, taskTitle) =>{
        switch(taskTitle){
            case "Collect Data & Communication":
                this.props.history.push("/collectdata", {subTaskId: subtaskId, todoId: todoId});
                break;
            case "Change Master Data":
                this.props.history.push("/masterdata");
                break;
            case "Create Route":
                this.props.history.push("/createRoute");
                break;
            case "Create and send routing instructions":
                this.props.history.push("/routing");
                break;
        }
    }

    render() {
        return (
            <div style={this.getSubTaskStyle(this.props.subTask.completed)}>
                {this.props.subTask.title}
                {this.props.subTask.completed ?
                    <Button variant="danger" size="sm" style={{padding: '3px', margin: '10px'}}
                            onClick={this.props.toggleSubTask.bind(this, this.props.subTask.id, this.props.todoId)}>Undo</Button> :
                    // <Button variant="success" size="sm" style={{padding: '3px', margin: '10px'}}
                    //         onClick={this.props.toggleSubTask.bind(this, this.props.subTask.id, this.props.todoId)}>Done</Button>
                    <Button variant="success" size="sm" style={{padding: '3px', margin: '10px'}}
                            onClick={() =>this.startTask(this.props.subTask.id, this.props.todoId, this.props.subTask.title)}>Start</Button>
                    
                    }
            </div>
        )
    }

    getSubTaskStyle = (completed) => {
        return {
            margin: '5px',
            backgroundColor: completed ? '#C8FDD3' : '#ffcccb',
            border: '1px solid black',
            borderRadius: '5px',
        }
    }
}

export default SubTask
