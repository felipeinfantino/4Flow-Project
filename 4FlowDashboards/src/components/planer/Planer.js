import React from 'react';
import Todos from '../dashboard/Todos';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddTodo from '../dashboard/AddTodo';
import {TaskContext, planerColumnNames} from '../taskManagment/TaskProvider';
import {uploadTask} from '../taskManagment/TaskUploader';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import AddToDoPersonal from '../dashboard/AddToDoPersonal';
import {OverlayTrigger, Button} from 'react-bootstrap';
import TaskFilter from './TaskFilter';
import {IoIosOptions} from 'react-icons/io';
import { IconContext } from "react-icons";


const defaultState = {
    isPrivate: true,
};

export class Planer extends React.Component {
    state = {...defaultState};

    addTodo = (todo) => {
        uploadTask(todo, "PlanerTasks");
    };

    render() {
        return (
            <div>
                <BootstrapSwitchButton
                    checked={false}
                    onlabel='Pipeline'
                    onstyle='danger'
                    offlabel='Personal'
                    offstyle='success'
                    style='w-25 mt-5'
                    onChange={() => {
                        this.setState({ isPrivate: !this.state.isPrivate })
                    }}
                />
                {this.state.isPrivate ?
                    <AddToDoPersonal addTodo={this.addTodo}/> :
                    <AddTodo addTodo={this.addTodo}/>
                }
                <div style={{display: 'flex'}}>
                    {Object.keys(planerColumnNames).map((state) => {
                        return (
                            <div key={state} style={{width: '25vw'}}>
                                <div>
                                    <h5 style={{
                                        backgroundColor: '#F8F8F8',
                                        border: '1px solid black',
                                        borderRadius: '5px',
                                        margin: '15px',
                                        padding: '10px',
                                        fontStyle: 'bold'
                                    }}>{planerColumnNames[state]}</h5>

                                    {planerColumnNames[state] === "Done" &&
                                    <OverlayTrigger trigger="click" placement="bottom" overlay={TaskFilter}>
                                        <Button
                                            style={{
                                                float: 'right',
                                                position: 'relative',
                                                top: '-57px',
                                                left: '-35px'
                                            }}
                                            variant="secondary">

                                            <IconContext.Provider
                                                value={{size: "1.2em", className: "global-class-name"}}>
                                                <div>
                                                    <IoIosOptions/>
                                                </div>
                                            </IconContext.Provider>
                                        </Button>
                                    </OverlayTrigger>}
                                </div>
                                {this.state.isPrivate ?
                                    <TaskContext.Consumer>
                                    {(context) => (
                                        <Todos todos={context.state.planer.todos.filter((todo) => todo.status === planerColumnNames[state] && todo.type == 'personal')}
                                            toggleSubTask={context.togglePlanerSubtask}
                                            history={this.props.history}
                                        />
                                    )}
                                    </TaskContext.Consumer> :
                                    <TaskContext.Consumer>
                                    {(context) => (
                                        <Todos todos={context.state.planer.todos.filter((todo) => todo.status === planerColumnNames[state] && todo.type == 'pipeline')}
                                            toggleSubTask={context.togglePlanerSubtask}
                                            history={this.props.history}
                                        />
                                    )}
                                    </TaskContext.Consumer>
                                }
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default Planer;