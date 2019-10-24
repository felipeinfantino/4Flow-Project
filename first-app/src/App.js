import React from 'react';
import logo from './logo.svg';
import './App.css';
import TaskList from './components/Tasklist';
import {DragDropContext } from 'react-beautiful-dnd';
import initialData from './components/initialData';


export default class App extends React.Component {
  state = initialData;

  onDragEnd = (result) =>{
    console.log(result);
    const {destination, source, draggableId} = result;
    const sourceId = source.droppableId;
    if(!destination) return;
    const dropId = destination.droppableId;
    if(dropId === sourceId && destination.index === source.index) return;
    const stateCopy = Object.assign({},this.state);

    stateCopy.columns[sourceId].taskIds.splice(source.index, 1);
    stateCopy.columns[dropId].taskIds.splice(destination.index, 0, draggableId);

    this.setState(stateCopy);
  }

  render(){
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
      <div className="App">

        {Object.keys(this.state.columns).map((key) => <TaskList tasks={this.state.columns[key].taskIds} id={key} key={key}></TaskList>)}

      </div>
      </DragDropContext>
    );
  }
}



