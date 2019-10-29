import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { states } from '../App';

export class TodoItem extends Component {
    render() {
        const {id, title, completed} = this.props.todo;
        return (
            <div style={this.getTodoItemStyle(this.props.todo.completed)}>
                <p>
                    { this.props.todo.status !== states.TO_DO ?  <button type="button" onClick={this.props.shiftItem.bind(this, id, false)}>sl</button> : ''}
                    {title}
                    { this.props.todo.status !== states.DONE ? <button type="button" onClick={this.props.shiftItem.bind(this, id, true)}>-></button> : ''}
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
