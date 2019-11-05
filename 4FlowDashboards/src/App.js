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
import SideBar from './components/SideBar';
import ChangePasswordModal from './components/ChangePasswordModal';

import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import {AuthProvider} from "./Auth";
import PrivateRoute from "./PrivateRoute";

document.body.style = 'background: black;';

export const columnNames = {
    TO_DO: 'To do',
    IN_PROGRESS: 'In progress',
    WAITING: 'Waiting',
    DONE: 'Done',
};

class App extends React.Component {

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Admin</h1>
                </header>
                <AuthProvider>
                    <BrowserRouter>
                        <div className="menu">
                            <ul>
                                <li><Link to="/">Planer</Link></li>
                                <li><Link to="/balancer">Balancer</Link></li>
                                <li><Link to="/about">About</Link></li>
                            </ul>
                        </div>
                        <div className="App-intro">
                            <Switch>
                                <PrivateRoute exact path="/" component={Planer}/>
                                <PrivateRoute path="/balancer" component={Balancer}/>
                                <PrivateRoute path="/about" component={About}/>
                                <PrivateRoute exact path="/signup" component={SignUp}/>
                                <Route exact path="/login" component={Login}/>
                            </Switch>
                        </div>
                    </BrowserRouter>
                </AuthProvider>
            </div>
        );
    }

}

export default App;