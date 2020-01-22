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
import {IconContext} from "react-icons";
import {FilterContext, filterOptions} from "./FilterContext";
import '../../assets/styles/common.css';


export class Planer extends React.Component {

    constructor(props) {
        super(props);

        this.updateFilterStatePlaner = (value) => {
            this.setState({
                ...this.state,
                filterValue: value
            });
        };

        this.state = {
            isPrivate: true,
            filterValue: filterOptions.ALL,
            updateFilterStatePlaner: this.updateFilterStatePlaner
        }
    }


    checkFilter = (deadline) => {
        let startDate = new Date(), endDate = new Date();

        let filter = this.state.filterValue;
        switch (filter) {
            case filterOptions.WEEK:
                startDate.setDate(startDate.getDate() - 7);
                break;
            case filterOptions.MONTH:
                startDate.setDate(startDate.getDate() - 30);
                break;
            case filterOptions.HALF_YEAR:
                startDate.setDate(startDate.getDate() - 182);
                break;
            case filterOptions.YEAR:
                startDate.setDate(startDate.getDate() - 365);
                break;
            default:
                startDate = new Date(deadline.seconds * 1000);
                endDate = new Date(deadline.seconds * 1000);
        }

        startDate = startDate.getTime() / 1000;
        endDate = endDate.getTime() / 1000;

        return deadline.seconds >= startDate && deadline.seconds <= endDate;
    };

    addTodo = (todo) => {
        uploadTask(todo, "PlanerTasks");
    };

    render() {
        return (
            <FilterContext.Provider value={this.state}>
                <div>
                    <BootstrapSwitchButton
                        checked={this.state.isPrivate}
                        onlabel='Pipeline'
                        onstyle='danger'
                        offlabel='Personal'
                        offstyle='success'
                        style='w-25 mt-5'
                        onChange={() => {
                            this.setState({
                                ...this.state,
                                isPrivate: !this.state.isPrivate,
                                filterValue: filterOptions.ALL
                            })
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

                                    <TaskContext.Consumer>
                                        {(context) => (
                                            <Todos todos={
                                                context.state.planer.todos.filter((todo) =>
                                                    todo.status === planerColumnNames[state] &&
                                                    todo.type === (this.state.isPrivate ? 'personal' : 'pipeline') &&
                                                    (planerColumnNames[state] === "Done" ? this.checkFilter(todo.deadline) : true)
                                                )}
                                                   toggleSubTask={context.togglePlanerSubtask}
                                                   history={this.props.history}
                                            />
                                        )}
                                    </TaskContext.Consumer>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </FilterContext.Provider>
        );
    }
}

export default Planer;