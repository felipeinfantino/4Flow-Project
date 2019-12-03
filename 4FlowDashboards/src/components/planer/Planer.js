import React from 'react';
import Todos from '../dashboard/Todos';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddTodo from '../dashboard/AddTodo';
import { TaskContext, planerColumnNames } from '../taskManagment/TaskProvider';
import { uploadTask } from '../taskManagment/TaskUploader';


class Planer extends React.Component {


    addTodo = (todo) => {
        uploadTask(todo, "PlanerTasks");
    };

    render() {
        return (
            <div>
                <AddTodo addTodo={this.addTodo}/>
                <div style={{display: 'flex'}}>
                    {Object.keys(planerColumnNames).map((state) => {
                        return (
                            <div key={state} style={{width: '25vw'}}>
                                <h5 style={{
                                    backgroundColor: '#F8F8F8',
                                    border: '1px solid black',
                                    borderRadius: '5px',
                                    margin: '15px',
                                    padding: '10px',
                                    fontStyle: 'bold'
                                }}>{planerColumnNames[state]}</h5>
                                <TaskContext.Consumer>
                                {(context) => (
                                    <Todos todos={context.state.planer.todos.filter((todo) => todo.status === planerColumnNames[state])}
                                           toggleSubTask={context.togglePlanerSubtask}
                                    />
                                )}
                                </TaskContext.Consumer>
                            </div>
                        )
                    })}
                </div>

            </div>
        );
    }
}

export default Planer;