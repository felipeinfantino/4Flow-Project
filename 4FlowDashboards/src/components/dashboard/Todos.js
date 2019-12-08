import React from 'react';
import TodoItem from './TodoItem';
import PropTypes from 'prop-types';
import {Accordion} from 'react-bootstrap';

class Todos extends React.Component {

    render() {
        return (
            <Accordion>
                {this.props.todos.map((todo) => <TodoItem key={todo.id} todo={todo} deleteItem={this.props.deleteItem}
                                                          shiftItem={this.props.shiftItem}
                                                          toggleSubTask={this.props.toggleSubTask}
                                                          history={this.props.history}
                                                          />
                                                          )}
            </Accordion>
        )
    }
}

Todos.propType = {
    todos: PropTypes.array.isRequired
};

export default Todos;

