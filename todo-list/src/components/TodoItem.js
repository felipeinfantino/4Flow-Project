import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { columnNames } from '../App';

export class TodoItem extends Component {
    render() {
        const {id, title} = this.props.todo;
        return (
            <div style={this.getTodoItemStyle()}>
                <p>
                    { this.props.todo.status !== columnNames.TO_DO ?  <button type="button" onClick={this.props.shiftItem.bind(this, id, false)}>sl</button> : ''}
                    {title}
                    { this.props.todo.status !== columnNames.DONE ? <button type="button" onClick={this.props.shiftItem.bind(this, id, true)}>-></button> : ''}
                </p>
            </div>
        )
    }


    getTodoItemStyle = () => {
       return {
           backgroundColor: '#f4f4f4',
           padding: '10px',
           borderBottom: '1px #ccc dotted',
        } 
    }

}

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
}

export default TodoItem
