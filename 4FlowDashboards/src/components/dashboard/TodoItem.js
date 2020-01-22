import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {Accordion, Card} from 'react-bootstrap';
import SubTaskList from './SubTaskList';
import firebase from "../firebase/Firebase";
import '../../assets/styles/common.css';

var db =  firebase.firestore();

export class TodoItem extends Component {


     deleteTaskAndNotify = async(id) =>{
        // get the task data
        const snapshot = await db.collection("PlanerTasks").doc(id).get();
        const data = snapshot.data();
        const mailBody = "Your employee needs help : " + JSON.stringify(data);
        // notify boss
        try{
            const response = await fetch('http://localhost:3001/email', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    destinations: ["amostuproject@gmail.com"],
                    subject: "Help needed",
                    text: mailBody
                })
    });
    console.log(response)
    // delete task
    await db.collection("PlanerTasks").doc(id).delete()
        }catch(e){
            console.log("error ", e);
        }
       
    }

    getHelp = async (id) =>{
        try{
            await this.deleteTaskAndNotify(id)
            alert("Task assigned to your boss")
        }catch(e){
            console.log("Error : ", e);
            alert("error")
        }
    }

    render() {
        const {id, title, subTasks} = this.props.todo;
        const tasks = subTasks == undefined ? [] : subTasks
        
    return (
            <Card style={{border: '1px solid black', borderRadius: '5px', margin: '15px', padding: '10px', backgroundColor: '#F8F8F8',}}>
                <Accordion.Toggle as={Card.Header} eventKey={id}>
                    <div>
                        <p style={{float: "left"}}>
                        {title} 
                        </p>
                        <button className="btn-help" onClick={() =>this.getHelp(id)} >Help</button>
                    </div>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={id}>
                <SubTaskList subTasks={tasks} key={id} todoId={id}
                                 toggleSubTask={this.props.toggleSubTask}
                                 history={this.props.history}
                                 />
                </Accordion.Collapse>
            </Card>
        )
    }
}

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
};

export default TodoItem