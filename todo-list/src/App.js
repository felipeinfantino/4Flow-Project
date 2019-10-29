import React from 'react';
import logo from './logo.svg';
import './App.css';
import Todos from './components/Todos';
import Header from './components/layout/Header';


class App extends React.Component {
  state = {
    todos: [
      {
        id: 1,
        title: 'Contact supplier',
        completed: false,
      },
      {
        id: 2,
        title: 'Set a route',
        completed: false,
      },
      {
        id: 3,
        title: 'Contact the truck guy',
        completed: false,
      },
    ],
    maxId : 4,
    newTodoTitle : '',
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
        <div style={{width: '50vw'}}>
          <h2>To do</h2>
          <Todos todos={this.state.todos.filter((todo) => todo.completed === false)} toggleCheck={this.toggleCheck} deleteItem={this.deleteItem}/>
        </div>
        <div  style={{width: '50vw'}}>
        <h2>Done</h2>
         <Todos todos={this.state.todos.filter((todo) => todo.completed === true)} toggleCheck={this.toggleCheck} deleteItem={this.deleteItem}/>
        </div>
      </div>
    </div>
  );
}
}

export default App;
