import React from 'react';
import './App.css';
import Todos from './components/Todos';
import Header from './components/layout/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddTodo from './components/AddTodo';
import {
  BrowserRouter,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'
import Planer from './components/Planer';
import About from './components/About';
import Balancer from './components/Balancer';

const uuidv4 = require('uuid/v4');
document.body.style = 'background: black;'; 

export const columnNames = {
  TO_DO : 'To do',
  IN_PROGRESS : 'In progress',
  WAITING : 'Waiting',
  DONE: 'Done',
}

class App extends React.Component {

render() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Admin</h1>
      </header>
      <BrowserRouter>
      <div className="menu">
          <ul>
            <li> <Link to="/">Planer</Link> </li>
            <li> <Link to="/balancer">Balancer</Link> </li>
            <li> <Link to="/about">About</Link> </li>
          </ul>
      </div>
      <div className="App-intro">
          <Switch>
            <Route exact path="/" component={Planer} />
            <Route path="/balancer" component={Balancer} />
            <Route path="/about" component={About} />
          </Switch>
        </div>
        </BrowserRouter>
    </div>

  );
}
}
export default App;