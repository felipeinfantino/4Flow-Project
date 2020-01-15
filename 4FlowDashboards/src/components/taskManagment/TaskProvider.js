import React, { Component } from 'react';
import firebase from "../firebase/Firebase";
import {updateTaskState} from "./TaskUploader";

var db =  firebase.firestore();


const uuidv4 = require('uuid/v4');
export const TaskContext = React.createContext();

export const planerColumnNames = {
    TO_DO: 'To do',
    IN_PROGRESS: 'In progress',
    WAITING: 'Waiting',
    DONE: 'Done',
};

export const balancerColumnNames = {
    WAITING: 'Waiting',
    IN_REVIEW: 'In Review',
    DONE: 'Done',
}

export default class TaskProvider extends Component {
    state = {
        planer: {
            todos: [],
            newTodoTitle: '',
            statusOrder: [planerColumnNames.TO_DO, planerColumnNames.IN_PROGRESS, planerColumnNames.WAITING, planerColumnNames.DONE],
        },
        balancer: {
            todos: [],
            newTodoTitle: '',
            statusOrder: [balancerColumnNames.WAITING, balancerColumnNames.IN_REVIEW, balancerColumnNames.DONE],
        },
        
    }

    componentDidMount(){
        db.collection("PlanerTasks").onSnapshot((querySnapshot) => {
            console.log(querySnapshot);
            const currentTodosInDb = [];
            querySnapshot.forEach((doc) => {
                currentTodosInDb.push(doc.data());
            });
            this.setState({planer: { todos: currentTodosInDb }});
        })
    }

    toggleSubTask = (subTaskId, todoId) => {
        this.setState({
            planer: {
                todos: this.state.planer.todos.map((todo) => {
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
            }
        })
    };

    setTodoStateIfNeeded = (todo) => {
        // the idea is to shift to right and left Todos under certain conditions
        switch (todo.status) {
            case planerColumnNames.TO_DO:
                // if there is at least one subTask completed and at least one task not completed, the state should change
                const existCompletedSubTask = todo.subTasks.find((subTask) => subTask.completed === true);
                const existNotCompletedSubTask = todo.subTasks.find((subTask) => subTask.completed === true);
                if (existCompletedSubTask && existNotCompletedSubTask) {
                    todo.status = planerColumnNames.IN_PROGRESS;
                    updateTaskState(todo, "PlanerTasks",planerColumnNames.IN_PROGRESS);
                }
                break;
            case planerColumnNames.IN_PROGRESS:
                // if all subTasks are not Completed the Todo should go to TO_DO
                const allUncompleted = todo.subTasks.every((subTask) => subTask.completed === false);
                if (allUncompleted) {
                    todo.status = planerColumnNames.TO_DO;
                    updateTaskState(todo, "PlanerTasks",planerColumnNames.IN_PROGRESS);
                    break;
                }
                // if all subTasks are completed the todo should go to WAITING , where the balancer should approve or not
                const allCompleted = todo.subTasks.every((subTask) => subTask.completed === true);
                if (allCompleted) {
                    todo.status = planerColumnNames.WAITING;
                    this.setState({
                        balancer:{ todos: [...this.state.balancer.todos, this.createBalancerTodo(todo)]}
                    });
                    updateTaskState(todo, "PlanerTasks",planerColumnNames.IN_PROGRESS);
                }
                break;
            case planerColumnNames.WAITING:
                // this a state where the balancer should review the route. If the planer did a mistake and wants to undo, he shold be able to do it
                const existsNotCompletedSubTask = todo.subTasks.find((subTask) => subTask.completed === true);
                if (existsNotCompletedSubTask) {
                    todo.status = planerColumnNames.IN_PROGRESS;
                    updateTaskState(todo, "PlanerTasks",planerColumnNames.IN_PROGRESS);
                    break;
                }
                break;
            case planerColumnNames.DONE:
                // when the balancer approves the route the todos come to this state
                break;
            default:
            // code block
        }
    };


    createBalancerTodo = (planerTask) =>{
        return {
            id: uuidv4(),
            planerTaskId: planerTask.id,
            title: planerTask.title,
            status: balancerColumnNames.WAITING,
            subTasks: planerTask.subTasks,
        }
    }



    render() {
        return (
           <TaskContext.Provider value={{
                state: this.state,
                togglePlanerSubtask: this.toggleSubTask
           }}>
               {this.props.children}
           </TaskContext.Provider>
        )
    }
}
