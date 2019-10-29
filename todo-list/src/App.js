import React from 'react';
import logo from './logo.svg';
import './App.css';
import Todos from './components/Todos';
import Header from './components/layout/Header';

export const states = {
  TO_DO : 'To do',
  IN_PROGRESS : 'In progress',
  WAITING : 'Waiting',
  DONE: 'Done',
}

class App extends React.Component {

  

  state = {
    todos: [
      {
        id: 1,
        title: 'Contact supplier',
        status: states.TO_DO,
        completed: false,
      },
      {
        id: 2,
        title: 'Send emaul',
        status: states.IN_PROGRESS,
        completed: false,
      },
      {
        id: 3,
        title: 'done emaul',
        status: states.DONE,
        completed: false,
      },
    ],
    maxId : 4,
    newTodoTitle : '',
    statusOrder: [states.TO_DO, states.IN_PROGRESS, states.WAITING, states.DONE],
  }

  toggleCheck = (event) =>{
    this.setState({todos: this.state.todos.map((todo) => {
      if(todo.id === event){
        todo.completed = !todo.completed;
      }
      return todo;
    })});
  }

  deleteItem = (id) =>{
    const elem = this.state.todos.find((todo) => todo.id === id);
    const index = this.state.todos.indexOf(elem);
    this.state.todos.splice(index, 1)
    this.setState({todos : this.state.todos});
  }

  getNextState = (status) => {
    const currentIndex = this.state.statusOrder.indexOf(status);
    return this.state.statusOrder[currentIndex +1]; // UI is preventing overflow, the display buttons take care of this
  }

  getPreviousState = (status) => {
    const currentIndex = this.state.statusOrder.indexOf(status);
    return this.state.statusOrder[currentIndex - 1]; // UI is preventing overflow, the display buttons take care of this
  }

  // shiftLeft is a boolean, if true shiftLeft if false shiftRight 
  shiftItem = (id, shiftLeft) =>{
    this.setState({todos: this.state.todos.map((todo) =>{
      if(todo.id === id){
        let newStatus;
        if(shiftLeft){
          newStatus = this.getNextState(todo.status);
        }else{
          newStatus = this.getPreviousState(todo.status);
        }
        todo.status = newStatus;
      }
      return todo;
    })})
    console.log(id);
    console.log(shiftLeft);
  }

  addTodo = () =>{
    let {maxId, newTodoTitle} = this.state;
    maxId +=1;
    const newItem = {
      id: maxId,
      title: newTodoTitle,
      completed: false,
    }
    this.state.todos.push(newItem)
    this.setState({todos: this.state.todos , maxId: maxId, newTodoTitle: ''});
    
  }

  canAddTodo = () =>{
    return this.state.newTodoTitle === '';
  }

  setNewTitle = (e) =>{
    this.setState({newTodoTitle: e.target.value})
  }

render(){
  return (
    <div className="App">
      <Header />
      <div>
        <input type="text" value={this.state.newTodoTitle} onChange={this.setNewTitle} />
        <button type="button" onClick={this.addTodo} disabled={this.canAddTodo()}>Add todo</button>
      </div>
      <div style={{display: 'flex'}}>
        {Object.keys(states).map((state) =>{
          return (
              <div key={state} style={{width: '25vw'}}>
                <h2>{states[state]}</h2>
                <Todos todos={this.state.todos.filter((todo) => todo.status === states[state])} 
                toggleCheck={this.toggleCheck} 
                deleteItem={this.deleteItem}
                shiftItem={this.shiftItem}
                />
              </div>
          )
        })}
      </div>
    </div>
  );
}
}

export default App;
