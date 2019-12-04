import React from 'react';
import Todos from '../dashboard/Todos';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TaskContext, balancerColumnNames } from '../taskManagment/TaskProvider';

class Balancer extends React.Component {

    render() {
        return (
            <div>
                <div style={{display: 'flex'}}>
                    {Object.keys(balancerColumnNames).map((state) => {
                        return (
                            <div key={state} style={{width: '25vw'}}>
                                <h5 style={{
                                    backgroundColor: '#F8F8F8',
                                    border: '1px solid black',
                                    borderRadius: '5px',
                                    margin: '15px',
                                    padding: '10px',
                                    fontStyle: 'bold'
                                }}>{balancerColumnNames[state]}</h5>
                              <TaskContext.Consumer>
                                {(context) => (
                                    <Todos todos={context.state.balancer.todos.filter((todo) => todo.status === balancerColumnNames[state])}
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

export default Balancer;