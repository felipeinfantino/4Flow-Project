import React from 'react';
import Task from './Task';
import { Droppable} from 'react-beautiful-dnd';


export default class TaskList extends React.Component{
    constructor(props){
        super(props);
    }
    
    render(){
     return (
    <Droppable droppableId={this.props.id} key={this.props.id}>
        {provided =>(
        <div className='task-list' ref={provided.innerRef} {...provided.droppableProps} key={this.props.id}>
         Task underneath
         <div>
        {provided.placeholder}
        {this.props.tasks.map((item, index) => <Task content={item} index={index} key={index}></Task>)}
        {provided.placeholder}
         </div>
      </div>
        )}
    </Droppable>
      )
    }
}