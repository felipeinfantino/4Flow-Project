import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class TodoItem extends Component {
    render() {
        const {id, title, completed} = this.props.todo;
        return (
            <div style={this.getTodoItemStyle(this.props.todo.completed)}>
                <p>
                    <input type="checkbox" checked={completed} name='' id='' onChange={this.props.toggleCheck.bind(this, id)} />
                    {title}
                    <button type="button" onClick={this.props.deleteItem.bind(this, id)}>Delete</button>
                </p>
            </div>
        )
    }


    getTodoItemStyle = (completed) => {
       return {
           backgroundColor: '#f4f4f4',
           padding: '10px',
           borderBottom: '1px #ccc dotted',
           textDecoration: completed ? 'line-through' : 'none',
        } 
    }

}

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
}

export default TodoItem
