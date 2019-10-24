
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

export default class Task extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <Draggable draggableId={this.props.content} key={this.props.content} index={this.props.index}>
            {provided =>(
                <div className='task' 
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                >
                    {this.props.content}
                </div>
                )}
            </Draggable>
        )
    }

}