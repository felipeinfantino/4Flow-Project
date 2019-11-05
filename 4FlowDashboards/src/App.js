import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter,
  Route,
  Link,
  Switch,
} from 'react-router-dom'
import Planer from './components/Planer';
import About from './components/About';
import Balancer from './components/Balancer';
import UserCreate from "./components/UserCreate"
import SideBar from './components/SideBar';
import ChangePasswordModal from './components/ChangePasswordModal';

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
      <SideBar></SideBar>
      <header className="App-header">
        <h1 className="App-title">Admin</h1>
      </header>
      <BrowserRouter>
      <div className="menu">
          <ul>
            <li> <Link to="/">Planer</Link> </li>
            <li> <Link to="/balancer">Balancer</Link> </li>
            <li> <Link to="/change-password">Change Password</Link> </li>
            <li> <Link to="/about">About</Link> </li>
            <li> <Link to="/create-account">Create new User</Link> </li>
          </ul>
      </div>
      <div className="App-intro">
          <Switch>
            <Route exact path="/" component={Planer} />
            <Route path="/balancer" component={Balancer} />
            <Route path="/change-password" component={ChangePasswordModal} />
            <Route path="/about" component={About} />
            <Route path="/create-account" component={UserCreate} />

          </Switch>
        </div>
        </BrowserRouter>
    </div>

  );
}
}
export default App;